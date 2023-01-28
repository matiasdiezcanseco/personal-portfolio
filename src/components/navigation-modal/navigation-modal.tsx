import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MdClose } from 'react-icons/md'

import CV from '../../assets/cv.pdf'
import './navigation-modal.scss'

interface NavigationModalType {
  close: () => void
}

const NavigationModal: React.FC<NavigationModalType> = ({ close }) => {
  const { t } = useTranslation(['navigation'])

  const handleNavigation = (e: React.MouseEvent, tag: string) => {
    e.preventDefault()
    document.getElementById(tag)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    close()
  }

  return (
    <motion.div
      className="navmodal"
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="navmodal__close">
        <MdClose size={40} onClick={close} />
      </div>
      <ul className="navmodal__list">
        <li className="navmodal__button">
          01.
          <a href="#home" onClick={(e) => handleNavigation(e, 'about')}>
            {t('About')}
          </a>
        </li>
        <li className="navmodal__button">
          02.
          <a href="#experience" onClick={(e) => handleNavigation(e, 'experience')}>
            {t('Experience')}
          </a>
        </li>
        <li className="navmodal__button">
          03.
          <a href="#projects" onClick={(e) => handleNavigation(e, 'projects')}>
            {t('Projects')}
          </a>
        </li>
        <li className="navmodal__button">
          04.
          <a href="#certifications" onClick={(e) => handleNavigation(e, 'certifications')}>
            {t('Certifications')}
          </a>
        </li>
        <li className="navmodal__button">
          05.
          <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')}>
            {t('Contact')}
          </a>
        </li>
        <li
          className="navmodal__button navmodal__button--active"
          onClick={() => window.open(CV)}
          onKeyUp={() => window.open(CV)}
        >
          CV
        </li>
      </ul>
    </motion.div>
  )
}

export default NavigationModal
