import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { find } from 'lodash'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FiFolder, FiGithub } from 'react-icons/fi'

import useLanguage from '../../../hooks/use-language'
import { IProject } from '../../../store/client'
import { getTechnologies } from '../../../store/queries'
import './small-project.scss'

interface ProjectType {
  project: IProject
}

const ProjectSmall: React.FC<ProjectType> = ({ project }) => {
  const { language } = useLanguage()

  const variants = {
    hover: { y: -10 },
  }

  const { data: tech } = useQuery({
    queryKey: ['technologies'],
    queryFn: getTechnologies,
  })

  const findUrl = (t: string) => {
    const selTech = find(tech, { name: t })
    return selTech?.url
  }

  return (
    <>
      <motion.div
        className="projectsmall"
        whileHover="hover"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="projectsmall__icons">
          <FiFolder size={30} />
          <div>
            {project.gitUrl && (
              <a target="_blank" href={project.gitUrl} rel="noreferrer">
                <FiGithub
                  className="projectsmall__icon"
                  size={20}
                  style={{ marginRight: '15px' }}
                />
              </a>
            )}
            {project.prodUrl && (
              <a href={project.prodUrl} target="_blank" rel="noreferrer">
                <BsBoxArrowUpRight className="projectsmall__icon" size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="projectsmall__content">
          <h1 className="projectsmall__title">{project[language as 'en'].name}</h1>
          <p className="projectsmall__description">
            {project[language as 'en'].description.substring(
              0,
              Math.min(160, project[language as 'en'].description.length)
            ) + '...'}
          </p>
        </div>
        <div className="projectsmall__tags">
          <ul className="projectsmall__list">
            {project.tags.map((t) => {
              const url = findUrl(t)
              return (
                <li className="projectsmall__item" key={t}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {t}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </>
  )
}

export default ProjectSmall
