import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import NET from 'vanta/dist/vanta.net.min'

import './greet.scss'

const Greet: React.FC = () => {
  const { t } = useTranslation(['greet'])

  const [effect, setEffect] = useState()
  const ref = useRef(null)

  const handleNavigation = (e: React.MouseEvent, tag: string) => {
    e.preventDefault()
    document.getElementById(tag)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (!effect) {
      setEffect(
        NET({
          el: ref.current,
          mouseControls: false,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          points: 30.0,
          maxDistance: 20.0,
          spacing: 25.0,
          color: '#4fe0b6',
          backgroundColor: '#202125',
        })
      )
    }

    return () => {
      if (effect) (effect as any).destroy()
    }
  }, [effect])

  return (
    <section className="greet" ref={ref}>
      <motion.div
        className="greet__container"
        id="home"
        transition={{ duration: 0.3, delay: 0 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="greet__intro">{t('Welcome')}</h3>
        <h1 className="greet__name">{t('Name')}</h1>
        <h2 className="greet__char">{t('Job')}</h2>
        <p className="greet__desc">{t('Description')}</p>
        <button className="greet__button" onClick={(e) => handleNavigation(e, 'projects')}>
          <a href="#projects">{t('Invitation')}</a>
        </button>
      </motion.div>
    </section>
  )
}

export default Greet
