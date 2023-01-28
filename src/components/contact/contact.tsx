import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

import SectionTitle from '../section-title/section-title'
import './contact.scss'

const Contact: React.FC = () => {
  const { t } = useTranslation(['contact'])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const [name, setName] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.section
      className="contact"
      id="contact"
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4 }}
    >
      <div className="contact__title">
        <SectionTitle numeration="05" title={t('Title')} />
      </div>
      <div className="contact__content">
        <p className="contact__desc">{t('Description')}</p>
        <form className="contact__form">
          <input
            className="contact__input"
            type="text"
            placeholder={t('Name') as string}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="contact__textarea"
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder={t('Body') as string}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </form>
        <button
          className="contact__btn"
          onClick={() => {
            window.open(
              `mailto:matiasdiezcanseco@gmail.com?subject=${
                encodeURIComponent('[Consulta]- ' + name) || ''
              }&body=${encodeURIComponent(body) || ''}`
            )
          }}
        >
          {t('Send')}
        </button>
      </div>
    </motion.section>
  )
}

export default Contact
