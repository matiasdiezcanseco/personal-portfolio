import { useQuery } from '@tanstack/react-query'
import { motion, useAnimation } from 'framer-motion'
import { find } from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

import myPic from '../../assets/me.png'
import useHover from '../../hooks/use-hover'
import { getTechnologies } from '../../store/queries'
import SectionTitle from '../section-title/section-title'
import './about.scss'

const About: React.FC = () => {
  const { t } = useTranslation(['about'])

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
      <SectionTitle numeration="01" title={t('Title') as string} />

      <div className="about__content">
        <div className="about__desc">
          <p>{t('Introduction')}</p>
          <p>{t('Path')}</p>
          <p>{t('Technologies')}</p>
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
