import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import useLanguage from '../../../hooks/use-language'
import { IJob } from '../../../store/client'
import './job.scss'

interface JobType {
  job: IJob
}

const JobComponent: React.FC<JobType> = ({ job }) => {
  const { t } = useTranslation(['experience'])
  const { language } = useLanguage()

  const initDate = dayjs(job.initialDate).format('MMM YYYY')
  const finalDate = job.finalDate ? dayjs(job.finalDate).format('MMM YYYY') : t('Today')

  return (
    <motion.div
      className="job"
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="job__header">
        <h1>
          {job[language as 'en'].name} |{' '}
          <span
            className="job__company"
            onClick={() => window.open(job.companyUrl)}
            onKeyUp={() => window.open(job.companyUrl)}
          >
            {job.company}
          </span>
        </h1>
        <h2>
          {initDate} - {finalDate}
        </h2>
      </div>
      <p className="job__description">
        {job[language as 'en'].description ? job[language as 'en'].description : ''}
      </p>
      <ul className="job__list">
        {job[language as 'en'].responsabilities.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default JobComponent
