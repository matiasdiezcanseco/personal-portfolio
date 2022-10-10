import ProjectBig from './ProjectBig'
import { MdOutlineCloseFullscreen } from 'react-icons/md'
import { motion } from 'framer-motion'
import './ProjectModal.scss'
import type { Project } from '../../store/state'

interface ProjectModalType {
  project: Project
  close: () => void
}

const ProjectModal: React.FC<ProjectModalType> = ({ project, close }) => {
  return (
    <motion.div
      transition={{ duration: 0.3, delay: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal"
    >
      <nav className="modal__nav" onClick={close} onKeyUp={close}>
        <MdOutlineCloseFullscreen size={20} />
      </nav>
      <ProjectBig project={project} dir={'left'} />
    </motion.div>
  )
}

export default ProjectModal
