import { TbCertificate } from 'react-icons/tb'

import './certificate.scss'

interface ICertificate {
  name: string
  certUrl: string
  courseUrl: string
  description: string
}

const Certificate: React.FC<ICertificate> = ({ name, certUrl, courseUrl, description }) => {
  return (
    <div className="certificate">
      <div className="certificate__title">
        <h4>
          <a target="_blank" href={courseUrl} rel="noreferrer">
            {name}
          </a>
        </h4>
        <div className="certificate__icons">
          <a target="_blank" href={certUrl} rel="noreferrer">
            <TbCertificate className="certificate__icons__icon" size={26} />
          </a>
        </div>
      </div>
      <p className="certificate__description">{description}</p>
    </div>
  )
}

export default Certificate
