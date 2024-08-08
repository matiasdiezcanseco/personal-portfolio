import { useTranslation } from 'react-i18next'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { IoDocumentOutline } from 'react-icons/io5'

import { cvUrl, githubUrl, linkedinUrl } from '../../utils/constants/links'
import './footer.scss'

const Footer: React.FC = () => {
  const { t } = useTranslation(['footer'])

  return (
    <div className="footer">
      <p className="footer__p">{t('Designed')}</p>
      <p
        className="footer__p hover"
        onClick={() => {
          window.open(`mailto:matiasdiezcanseco@gmail.com`)
        }}
        onKeyUp={() => {
          window.open(`mailto:matiasdiezcanseco@gmail.com`)
        }}
      >
        matiasdiezcanseco@gmail.com
      </p>
      <ul className="footer__list">
        <li>
          <a target="_blank" href={githubUrl} rel="noreferrer">
            <FiGithub size={18} />
          </a>
        </li>
        <li>
          <a target="_blank" href={linkedinUrl} rel="noreferrer">
            <FiLinkedin size={18} />
          </a>
        </li>
        <li>
          <a target="_blank" href={cvUrl} rel="noreferrer">
            <IoDocumentOutline size={18} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Footer
