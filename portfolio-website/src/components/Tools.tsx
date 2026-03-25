import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups, certifications } from '../data'

/* ─── Group accent config ────────────────────────────────────────────────────── */

const groupConfig: Record<string, { color: string; glow: string; icon: string }> = {
  Security:    { color: 'var(--red)',    glow: 'rgba(255,107,91,0.18)',   icon: '🛡' },
  Languages:   { color: 'var(--blue)',   glow: 'rgba(91,173,255,0.18)',   icon: '{ }' },
  Engineering: { color: 'var(--violet)', glow: 'rgba(157,123,255,0.18)', icon: '⚙' },
  'AI & Data': { color: 'var(--cyan)',   glow: 'rgba(94,245,208,0.16)',   icon: '◈' },
}

/* ─── Variants ───────────────────────────────────────────────────────────────── */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const panel = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const pill = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Tools Section ──────────────────────────────────────────────────────────── */

export function Tools() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="tools section" id="tools" aria-labelledby="tools-heading">
      <div className="tools__head">
        <div>
          <div style={{ marginBottom: '1.1rem' }}>
            <span className="section-label">Stack</span>
          </div>
          <h2 className="section-head__h2" id="tools-heading">
            Tools &amp; technologies
          </h2>
          <p className="section-head__sub">
            The stack I reach for when building secure, production-quality systems.
          </p>
        </div>
      </div>

      <motion.div
        className="tools-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {skillGroups.map((group) => {
          const cfg = groupConfig[group.label] ?? { color: 'var(--blue)', glow: 'rgba(91,173,255,0.18)', icon: '◆' }
          return (
            <motion.div
              key={group.label}
              className="tool-panel card"
              variants={reduced ? undefined : panel}
              style={{ '--tool-accent': cfg.color, '--tool-glow': cfg.glow } as React.CSSProperties}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow blob */}
              <div className="tool-panel__blob" aria-hidden="true" />

              {/* Header */}
              <div className="tool-panel__header">
                <span className="tool-panel__icon" aria-hidden="true">{cfg.icon}</span>
                <span className="tool-panel__label">{group.label}</span>
                <span className="tool-panel__count">{group.items.length}</span>
              </div>

              {/* Pills */}
              <motion.div
                className="tool-panel__pills"
                variants={container}
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    className="tool-pill"
                    variants={reduced ? undefined : pill}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.18 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Certifications */}
      <motion.div
        className="tl-certs"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : 0.1 }}
      >
        <span className="tl-certs__label">Certifications</span>
        <div className="tl-certs__row">
          {certifications.map((cert) => {
            const earned = cert.status === 'Earned'
            return (
              <div key={cert.label} className={`tl-cert ${earned ? 'tl-cert--earned' : 'tl-cert--progress'}`}>
                <span className="tl-cert__dot" aria-hidden="true" />
                <span className="tl-cert__name">{cert.label}</span>
                <span className="tl-cert__status">{cert.status}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

    </section>
  )
}
