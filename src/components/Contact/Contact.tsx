import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './Contact.scss'

const Contact: React.FC = () => {
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
      <div className="contact__header">
        <div className="contact__line"></div>
        <h1 className="contact__title">
          <span className="contact__title--number">04.</span> Contáctame
        </h1>
        <div className="contact__line"></div>
      </div>
      <div className="contact__content">
        <p className="contact__desc">
          En estos momentos estoy disponible a nuevas oportunidades. Incluso si
          solo es una pregunta o quieres saber más de mí, siempre estoy atento a
          mis correos.
        </p>
        <form className="contact__form">
          <input
            className="contact__input"
            type="text"
            placeholder="Tu nombre"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="contact__textarea"
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Escribe el contenido de tu correo aquí..."
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
          Enviar
        </button>
      </div>
    </motion.section>
  )
}

export default Contact
