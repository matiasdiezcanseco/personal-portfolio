import { useQuery } from '@tanstack/react-query'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

import { getCertificates } from '../../store/queries'
import SectionTitle from '../section-title/section-title'
import Certificate from './certificate/certificate'
import './certifications.scss'

const Certifications: React.FC = () => {
  const { t } = useTranslation(['certifications'])

  const { data: certifications } = useQuery({
    queryKey: ['certificates'],
    queryFn: getCertificates,
  })

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
      id="certifications"
      className="certifications"
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.4 }}
    >
      <SectionTitle numeration="04" title={t('Title')} />
      <div className="certifications__content">
        {certifications && certifications.map((cert) => <Certificate key={cert._id} {...cert} />)}
      </div>
    </motion.section>
  )
}

export default Certifications
