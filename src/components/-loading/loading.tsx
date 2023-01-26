import { motion } from 'framer-motion'

import Logo from '../../assets/-logo'
import './Loading.scss'

const Loading: React.FC = () => {
  return (
    <motion.div className="loading">
      <Logo size="100" animated={true} />
    </motion.div>
  )
}

export default Loading
