import JobComponent from './job/job'
import JobMenu from './job-menu/job-menu'
import { jobsState } from '../../store/state'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRecoilValue } from 'recoil'
import './Experience.scss'

const Experience: React.FC = () => {
  const jobs = useRecoilValue(jobsState)
  const [selectedJobId, setSelectedJobNameId] = useState(jobs[0]._id)

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.section
      id="experience"
      className="experience"
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4 }}
    >
      <h1 className="experience__title">
        <span className="experience__title--number">02.</span>Experiencia
        <span className="experience__title--line"></span>
      </h1>
      <div className="experience__content">
        <JobMenu jobs={jobs} selectedId={selectedJobId} onSelect={setSelectedJobNameId} />
        {jobs.map((j) => {
          if (j._id !== selectedJobId) return
          return <JobComponent key={j._id} job={j} />
        })}
      </div>
    </motion.section>
  )
}

export default Experience
