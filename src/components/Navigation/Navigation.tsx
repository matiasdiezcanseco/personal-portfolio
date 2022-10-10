import CV from '../../assets/cv.pdf'
import Logo from '../../assets/Logo'
import Modal from 'react-modal'
import NavigationModal from './NavigationModal'
import useScrollPosition from '@react-hook/window-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import './Navigation.scss'

const customStyles = {
  content: {
    top: '50%',
    left: '30%',
    transform: 'translate(-0%, -50%)',
    zIndex: 100,
    border: 'none',
    background: '#26282c',
    height: '100%',
    width: '70%',
    padding: 0,
    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.35)',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: '#4fe0b710',
    zIndex: 99,
    backdropFilter: 'blur(2px)',
  },
}

const Navigation: React.FC = () => {
  const [toggle, setToggle] = useState(true)
  const [prevY, setprevY] = useState(0)
  const scrollY = useScrollPosition(60)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  useEffect(() => {
    if (prevY < window.scrollY) setToggle(false)
    else setToggle(true)
    setprevY(window.scrollY)
  }, [scrollY])

  const handleNavigation = (e: React.MouseEvent, tag: string) => {
    e.preventDefault()
    document.getElementById(tag)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <AnimatePresence>
        {toggle && (
          <motion.nav
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, top: -20 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -20 }}
            className="navigation"
          >
            <div className={`navigation__container ${scrollY > 0 ? 'active' : ''}`}>
              <div
                className="navigation__image"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                onKeyUp={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                <Logo size="50" animated={false} />
              </div>
              <div className="navigation__ham">
                <HiOutlineMenuAlt3 size={30} onClick={openModal} />
              </div>
              <ul className="navigation__list">
                <li className="navigation__item">
                  <a
                    className="navigation__tag"
                    href="#about"
                    onClick={(e) => handleNavigation(e, 'about')}
                  >
                    <span className="navigation__tag--active">01. </span>Sobre Mi
                  </a>
                </li>
                <li className="navigation__item">
                  <a
                    className="navigation__tag"
                    href="#experience"
                    onClick={(e) => handleNavigation(e, 'experience')}
                  >
                    <span className="navigation__tag--active">02. </span>
                    Experiencia
                  </a>
                </li>
                <li className="navigation__item">
                  <a
                    className="navigation__tag"
                    href="#projects"
                    onClick={(e) => handleNavigation(e, 'projects')}
                  >
                    <span className="navigation__tag--active">03. </span>
                    Proyectos
                  </a>
                </li>
                <li className="navigation__item">
                  <a
                    className="navigation__tag"
                    href="#contact"
                    onClick={(e) => handleNavigation(e, 'contact')}
                  >
                    <span className="navigation__tag--active">04. </span>
                    Contacto
                  </a>
                </li>
                <li className="navigation__item navigation__item--active">
                  <a
                    className="navigation__tag navigation__tag--active"
                    target="_blank"
                    href={CV}
                    rel="noreferrer"
                  >
                    CV
                  </a>
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <Modal
        closeTimeoutMS={100}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <NavigationModal close={closeModal} />
      </Modal>
    </>
  )
}

export default Navigation
