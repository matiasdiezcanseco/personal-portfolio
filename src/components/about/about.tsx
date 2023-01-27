import { useQuery } from '@tanstack/react-query'
import { motion, useAnimation } from 'framer-motion'
import { find } from 'lodash'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import myPic from '../../assets/me.png'
import useHover from '../../hooks/use-hover'
import { getTechnologies } from '../../store/queries'
import SectionTitle from '../section-title/section-title'
import './about.scss'

const About: React.FC = () => {
  const [hoverRef, isHovered] = useHover()

  const { data: tech } = useQuery({
    queryKey: ['technologies'],
    queryFn: getTechnologies,
  })

  const [usedTech] = useState(['React', 'Typescript', 'ExpressJS', 'AWS', 'Prisma', 'Firebase'])

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
    <motion.div
      className="about"
      id="about"
      transition={{ duration: 0.4 }}
      variants={variants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <SectionTitle numeration="01" title="Sobre Mi" />

      <div className="about__content">
        <div className="about__desc">
          <p>
            ¡Hola! Mi nombre es Matías y me encanta crear aplicaciones web. Siempre he tenido un
            interés por las computadoras y mi pasión por el desarrollo web inició en el 2020,
            terminando la universidad. Desde ese momento no he dejado de aprender y desarrollar
            proyectos.
          </p>
          <p>
            Al día de hoy he creado múltiples proyectos, desde recrear aplicaciones con ingeniería
            inversa a modo de práctica hasta servicios digitales completamente automatizados. Mi
            principal objetivo es continuar creciendo como profesional al desarrollar aplicaciones
            modernas y desafiantes.
          </p>
          <p>Las principales tecnologías con las que trabajo en estos momentos son:</p>
          <div className="about__grid">
            {usedTech.map((t) => {
              const tag = find(tech, { name: t })
              return (
                <li key={t}>
                  <a href={tag?.url} target="_blank" rel="noreferrer">
                    {t}
                  </a>
                </li>
              )
            })}
          </div>
        </div>
        <div className="about__image" style={{ backgroundImage: `url(${myPic})` }}>
          <div
            ref={hoverRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: isHovered ? '' : 'rgba(12, 39, 1, 0.377)',
              transition: 'background-color 300ms ease-in-out',
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
