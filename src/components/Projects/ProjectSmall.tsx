import { find } from 'lodash'
import Modal from 'react-modal'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FiFolder, FiGithub } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { techlonogiesState } from '../../store/state'
import { useRecoilValue } from 'recoil'
import './ProjectSmall.scss'

import type { Project } from '../../store/state'

Modal.setAppElement('#modal')

interface ProjectType {
  project: Project
}

const ProjectSmall: React.FC<ProjectType> = ({ project }) => {
  const variants = {
    hover: { y: -10 },
  }

  const tech = useRecoilValue(techlonogiesState)

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
          <h1 className="projectsmall__title">{project.name}</h1>
          <p className="projectsmall__description">
            {project.description.substring(0, Math.min(160, project.description.length)) + '...'}
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
