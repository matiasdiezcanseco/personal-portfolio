import { find } from 'lodash'
import Modal from 'react-modal'
import ProjectModal from './ProjectModal'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FiFolder, FiGithub } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { techlonogiesState } from '../../store/state'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import './ProjectSmall.scss'

import type { Project } from '../../store/state'

Modal.setAppElement('#modal')

interface ProjectType {
  project: Project
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    background: '#26282c',
    border: 'none',
    padding: 0,
    overflow: 'visible',
    backgroundColor: '#26282c',
    width: '90%',
    maxWidth: '800px',
  },
  overlay: {
    backgroundColor: 'rgba(30,30,30,0.7)',
    zIndex: 99,
  },
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

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <>
      <motion.div
        className="projectsmall"
        whileHover="hover"
        transition={{ duration: 0.3 }}
        variants={variants}
        onClick={openModal}
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
      <Modal
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ProjectModal project={project} close={closeModal} />
      </Modal>
    </>
  )
}

export default ProjectSmall
