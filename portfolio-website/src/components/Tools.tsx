import { motion } from 'framer-motion'

const skills = [
  { label: 'React', pct: 90, icon: '⚛' },
  { label: 'TypeScript', pct: 85, icon: 'TS' },
  { label: 'Python', pct: 80, icon: '🐍' },
  { label: 'Next.js', pct: 90, icon: '☁' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const barVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Tools() {
  return (
    <section className="section skills-section" id="tools" aria-labelledby="skills-heading">
      <div className="skills-layout">
        <motion.div
          className="skills-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="skills-image-placeholder">
            <img src="/0Z0A6044.jpg" alt="Skills illustration" />
          </div>
        </motion.div>

        <div className="skills-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title" id="skills-heading" style={{ textAlign: 'left' }}>
              My <span className="accent-text">Skills</span>
            </h2>
            <p className="skills-description">
              I'm a passionate developer with experience creating modern,
              responsive applications. I specialize in full-stack development
              using cutting-edge technologies to deliver exceptional results.
            </p>
          </motion.div>

          <motion.div
            className="skills-bars"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {skills.map(({ label, pct, icon }) => (
              <motion.div key={label} className="skill-bar" variants={barVariant}>
                <div className="skill-bar__header">
                  <span className="skill-bar__icon">{icon}</span>
                  <span className="skill-bar__label">{label}</span>
                  <span className="skill-bar__pct">{pct}%</span>
                </div>
                <div className="skill-bar__track">
                  <motion.div
                    className="skill-bar__fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
