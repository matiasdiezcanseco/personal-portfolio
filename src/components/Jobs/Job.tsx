import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import './Job.scss'
import type { Job } from '../../store/state'

interface JobType {
  job: Job
}

const JobComponent: React.FC<JobType> = ({ job }) => {
  const initDate = dayjs(job.initialDate).format('MMM YYYY')
  const finalDate = job.finalDate ? dayjs(job.finalDate).format('MMM YYYY') : 'Presente'

  return (
    <motion.div
      className="job"
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="job__header">
        <h1>
          {job.name} |{' '}
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
      <p className="job__description">{job.description ? job.description : ''}</p>
      <ul className="job__list">
        {job.responsabilities.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default JobComponent
