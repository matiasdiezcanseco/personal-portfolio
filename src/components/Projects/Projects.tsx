import Project from './ProjectSmall'
import ProjectBig from './ProjectBig'
import { filter } from 'lodash'
import { Fragment, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { projectsState } from '../../store/state'
import { useInView } from 'react-intersection-observer'
import { useRecoilValue } from 'recoil'
import './Projects.scss'
import { githubUrl } from '../../constants/links'

const Projects: React.FC = () => {
  const projects = useRecoilValue(projectsState)
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
      <h1 className="projects__title">
        <span className="projects__title--number">03.</span> Proyectos
        <span className="projects__title--line"></span>
      </h1>
      <div className="projects__content">
        <div className="projects__featured">
          {featuredProjects.map((p, i) => (
            <Fragment key={p.name}>
              <ProjectBig project={p} dir={i % 2 === 0 ? 'left' : 'right'} />
              <br />
              <br />
            </Fragment>
          ))}
        </div>
        <div className="projects__subtitle">
          <h2>Otros Proyectos</h2>
          <h3
            className="projects__subtitle"
            onClick={() => window.open(githubUrl)}
            onKeyUp={() => window.open(githubUrl)}
          >
            Visita el repositorio
          </h3>
        </div>

        <div className="projects__list">
          {nonFeaturedProjects.map((p) => (
            <Project key={p.name} project={p} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
