import { useQuery } from '@tanstack/react-query'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { getJobs } from '../../store/queries'
import './experience.scss'
import JobMenu from './job-menu/job-menu'
import JobComponent from './job/job'

const Experience: React.FC = () => {
  const { data: jobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })

  const [selectedJobId, setSelectedJobNameId] = useState(jobs ? jobs[0]._id : '')

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
        {jobs && <JobMenu jobs={jobs} selectedId={selectedJobId} onSelect={setSelectedJobNameId} />}
        {jobs &&
          jobs.map((j) => {
            if (j._id !== selectedJobId) return
            return <JobComponent key={j._id} job={j} />
          })}
      </div>
    </motion.section>
  )
}

export default Experience
