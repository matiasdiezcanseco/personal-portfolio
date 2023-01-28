import { useQuery } from '@tanstack/react-query'
import { motion, useAnimation } from 'framer-motion'
import { filter } from 'lodash'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

import useLanguage from '../../hooks/use-language'
import { getProjects } from '../../store/queries'
import { githubUrl } from '../../utils/constants/links'
import SectionTitle from '../section-title/section-title'
import BigProject from './big-project/big-project'
import './projects.scss'
import SmallProject from './small-project/small-project'

const Projects: React.FC = () => {
  const { t } = useTranslation(['projects'])
  const { language } = useLanguage()

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const featuredProjects = filter(projects, { featured: true })
  const nonFeaturedProjects = filter(projects, { featured: false })

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
      id="projects"
      className="projects"
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle numeration="03" title={t('Title')} />
      <div className="projects__content">
        <div className="projects__featured">
          {featuredProjects.length > 0 &&
            featuredProjects.map((p, i) => (
              <Fragment key={p[language as 'en'].name}>
                <BigProject project={p} dir={i % 2 === 0 ? 'left' : 'right'} />
                <br />
                <br />
              </Fragment>
            ))}
        </div>
        <div className="projects__subtitle">
          <h3>{t('Other')}</h3>
          <h4
            className="projects__subtitle"
            onClick={() => window.open(githubUrl)}
            onKeyUp={() => window.open(githubUrl)}
          >
            {t('Visit')}
          </h4>
        </div>

        <div className="projects__list">
          {nonFeaturedProjects.length > 0 &&
            nonFeaturedProjects.map((p) => (
              <SmallProject key={p[language as 'en'].name} project={p} />
            ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
