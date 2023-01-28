import { useTranslation } from 'react-i18next'
import { TbCertificate } from 'react-icons/tb'

import type { ICertificate } from '../../../store/client'
import './certificate.scss'

const Certificate: React.FC<ICertificate> = (props) => {
  const {
    i18n: { language },
  } = useTranslation()

  return (
    <div className="certificate">
      <div className="certificate__title">
        <h4>
          <a target="_blank" href={props.courseUrl} rel="noreferrer">
            {props[language as 'en'].name}
          </a>
        </h4>
        <div className="certificate__icons">
          <a target="_blank" href={props.certUrl} rel="noreferrer">
            <TbCertificate className="certificate__icons__icon" size={26} />
          </a>
        </div>
      </div>
      <p className="certificate__description">{props[language as 'en'].description}</p>
    </div>
  )
}

export default Certificate
