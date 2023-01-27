import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import SectionTitle from '../section-title/section-title'
import './certifications.scss'

const Certifications: React.FC = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }
  const controls = useAnimation()
  const [ref, inView] = useInView()
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.section
      id="certifications"
      className="certifications"
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle numeration="04" title="Certificaciones" />
      <div className="certifications__content"></div>
    </motion.section>
  )
}

export default Certifications
