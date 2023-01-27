import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import './app.scss'
import About from './components/about/about'
import Certifications from './components/certifications/certifications'
import Contact from './components/contact/contact'
import Experience from './components/experience/experience'
import Footer from './components/footer/footer'
import Greet from './components/greet/greet'
import Loading from './components/loading/loading'
import Navigation from './components/navigation/navigation'
import Projects from './components/projects/projects'
import { getJobs, getProjects, getTechnologies } from './store/queries'

const App = () => {
  const { isLoading: isLoadingJobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })
  const { isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
  const { isLoading: isLoadingTechnologies } = useQuery({
    queryKey: ['technologies'],
    queryFn: getTechnologies,
  })

  const isLoading = useMemo(() => {
    return isLoadingJobs || isLoadingProjects || isLoadingTechnologies
  }, [isLoadingJobs, isLoadingProjects, isLoadingTechnologies])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navigation />
          <Greet />
          <div className="app">
            <About />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default App
