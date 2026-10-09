import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { projects } from '../data'
import { ease } from '../motion'
import type { Project } from '../types'

const COLUMNS = 3
const MAX_TILT = 7 // degrees
const tiltSpring = { stiffness: 220, damping: 20, mass: 0.6 }

function linkFor(url: string) {
  const host = new URL(url).hostname
  if (host.includes('github')) return { short: 'GitHub', long: 'View on GitHub' }
  if (host.includes('apple')) return { short: 'App Store', long: 'View on the App Store' }
  return { short: 'Visit', long: 'Visit site' }
}

/* ─── Card entrance: springs up in a wave, then the photo is unveiled ───── */

const rowDelay = (i: number) => (i % COLUMNS) * 0.12

const cardIn = {
  hidden: { opacity: 0, y: 70, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    // springy landing with a touch of overshoot, staggered across the row
    transition: { type: 'spring' as const, stiffness: 110, damping: 15, mass: 0.9, delay: rowDelay(i) },
  }),
}

const photoReveal = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.15 },
  visible: (i: number) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1.1, ease, delay: rowDelay(i) + 0.15 },
  }),
}

/* ─── Card: tilts toward the cursor, opens on click ─────────────────────── */

function Card({ project, index, reduced, linked, onOpen }: {
  project: Project
  index: number
  reduced: boolean
  /** false while this card's detail view has been navigated away from */
  linked: boolean
  onOpen: (p: Project) => void
}) {
  // pointer position across the card, 0..1 (0.5 = centre)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), tiltSpring)
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), tiltSpring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 55%)`
  const [hovered, setHovered] = useState(false)

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
    setHovered(false)
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    setHovered(true)
  }

  const open = () => {
    reset()
    onOpen(project)
  }

  return (
    // outer wrapper owns the entrance so it doesn't fight the shared layout animation
    <motion.div
      className="card-wrap"
      custom={index}
      variants={cardIn}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      // begin a little before the card scrolls in so a fast scroll never lands on blanks
      viewport={{ once: true, amount: 'some', margin: '0px 0px 120px 0px' }}
    >
      <motion.div
        layoutId={linked ? `card-${project.id}` : undefined}
        className="card"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${project.title} — open details`}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            open()
          }
        }}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 900, borderRadius: 22 }}
      >
        <motion.div layoutId={linked ? `card-media-${project.id}` : undefined} className="card__media">
          <motion.div className="card__reveal" custom={index} variants={photoReveal}>
            {project.image ? (
              <img src={project.image} alt="" loading="lazy" />
            ) : (
              <span className="card__placeholder" aria-hidden="true">
                {project.title.charAt(0)}
              </span>
            )}
          </motion.div>
        </motion.div>
        <div className="card__body">
          <p className="card__eyebrow">{project.category}</p>
          <h3 className="card__title">{project.title}</h3>
          <p className="card__summary">{project.summary}</p>
          <span className="card__cta">
            Learn more <ChevronRight size={14} aria-hidden="true" />
          </span>
        </div>
        {!reduced && (
          <motion.span
            className="card__glare"
            aria-hidden="true"
            style={{ backgroundImage: glare }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─── Detail view ────────────────────────────────────────────────────────── */

const slide = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 32 } },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0, transition: { duration: 0.18 } }),
}

const pills = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } },
}

const pill = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 26 } },
}

function ProjectDetail({ project, anchorId, detached, dir, position, total, reduced, onPrev, onNext, onClose }: {
  project: Project
  /** the card the sheet grew out of — the shared-layout partner */
  anchorId: string
  /** true once the user has arrowed away from the anchor card */
  detached: boolean
  dir: number
  position: number
  total: number
  reduced: boolean
  onPrev: () => void
  onNext: () => void
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const link = linkFor(project.repo)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // each project starts at the top of the sheet
  useEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 })
  }, [project.id])

  return (
    <>
      <motion.div
        className="detail__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, ease }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="detail__wrap">
        <motion.div
          ref={sheetRef}
          layoutId={`card-${anchorId}`}
          className="detail"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`detail-title-${project.id}`}
          style={{ borderRadius: 28 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          // after arrowing away, there's no matching card to shrink into — fade out instead
          exit={detached ? { opacity: 0, scale: 0.94, transition: { duration: 0.25, ease } } : undefined}
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={project.id}
              className="detail__content"
              custom={dir}
              variants={reduced ? undefined : slide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div
                layoutId={!detached && project.id === anchorId ? `card-media-${anchorId}` : undefined}
                className="detail__media"
              >
                {project.image ? (
                  <img src={project.image} alt="" />
                ) : (
                  <span className="card__placeholder" aria-hidden="true">
                    {project.title.charAt(0)}
                  </span>
                )}
              </motion.div>

              <motion.div
                className="detail__body"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <p className="detail__eyebrow">{project.category}</p>
                <h2 className="detail__title" id={`detail-title-${project.id}`}>
                  {project.title}
                </h2>
                <p className="detail__description">{project.description ?? project.summary}</p>
                <motion.ul
                  className="detail__stack"
                  aria-label="Built with"
                  variants={pills}
                  initial={reduced ? false : 'hidden'}
                  animate="visible"
                >
                  {project.stack.map((tech) => (
                    <motion.li key={tech} variants={pill}>
                      {tech}
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="detail__footer">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-pill detail__cta">
                    {link.long} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <div className="detail__nav">
                    <button type="button" className="detail__arrow" onClick={onPrev} aria-label="Previous project">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="detail__count" aria-live="polite">
                      {position} / {total}
                    </span>
                    <button type="button" className="detail__arrow" onClick={onNext} aria-label="Next project">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            ref={closeRef}
            type="button"
            className="detail__close"
            onClick={onClose}
            aria-label="Close"
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <X size={18} />
          </motion.button>
        </motion.div>
      </div>
    </>
  )
}

/* ─── Section title that grows into place as it scrolls to centre ───────── */

function ScrollTitle({ children, id, reduced }: { children: React.ReactNode; id: string; reduced: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.78, 1])
  // function form: range-based opacity gets handed to a native ScrollTimeline that ignores `target`
  const opacity = useTransform(scrollYProgress, (p) => (reduced ? 1 : 0.15 + 0.85 * Math.min(1, p / 0.85)))

  return (
    <motion.h2 ref={ref} className="section-title" id={id} style={{ scale, opacity }}>
      {children}
    </motion.h2>
  )
}

export function Projects() {
  const reduced = useReducedMotion() ?? false
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [anchorId, setAnchorId] = useState<string | null>(null)
  const [detached, setDetached] = useState(false)
  const [dir, setDir] = useState(1)
  const total = projects.length

  const open = useCallback((p: Project) => {
    setSelectedIndex(projects.findIndex((x) => x.id === p.id))
    setAnchorId(p.id)
    setDetached(false)
  }, [])

  const close = useCallback(() => setSelectedIndex(null), [])

  const step = useCallback(
    (delta: number) => {
      setDir(delta)
      setDetached(true)
      setSelectedIndex((i) => (i === null ? i : (i + delta + total) % total))
    },
    [total]
  )
  const prev = useCallback(() => step(-1), [step])
  const next = useCallback(() => step(1), [step])

  const selected = selectedIndex === null ? null : projects[selectedIndex]

  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <div className="section__inner section__inner--wide">
        <ScrollTitle id="work-heading" reduced={reduced}>
          Work.
        </ScrollTitle>

        <div className="work-grid">
          {projects.map((project, i) => (
            <Card
              key={project.id}
              project={project}
              index={i}
              reduced={reduced}
              linked={!(detached && project.id === anchorId)}
              onOpen={open}
            />
          ))}
        </div>

        <p className="work__more">
          <a
            href="https://github.com/Moises-ITS?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            More on GitHub <ChevronRight size={18} aria-hidden="true" />
          </a>
        </p>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          setAnchorId(null)
          setDetached(false)
        }}
      >
        {selected && anchorId && (
          <ProjectDetail
            key={anchorId}
            project={selected}
            anchorId={anchorId}
            detached={detached}
            dir={dir}
            position={(selectedIndex ?? 0) + 1}
            total={total}
            reduced={reduced}
            onPrev={prev}
            onNext={next}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
