import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Experience from './components/Jobs/Experience'
import Footer from './components/Footer/Footer'
import Greet from './components/Greet/Greet'
import Loading from './components/Loading/Loading'
import Navigation from './components/Navigation/Navigation'
import Projects from './components/Projects/Projects'
import { client } from './store/client'
import { jobsState, projectsState, techlonogiesState } from './store/state'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import './App.scss'

import type { Project, Technology, Job } from './store/state'

const App = () => {
  const [jobs, setJobs] = useRecoilState(jobsState)
  const [tech, setTech] = useRecoilState(techlonogiesState)
  const [projects, setProjects] = useRecoilState(projectsState)
  const [isLoading, setIsLoading] = useState(true)
  const [start] = useState(Date.now())

  useEffect(() => {
    const exec = async () => {
      const projects: Project[] = await client.fetch("*[_type == 'projects']")
      setProjects(projects)

      const jobs: Job[] = await client.fetch("*[_type == 'jobs']")
      setJobs(jobs)

      const technologies: Technology[] = await client.fetch("*[_type == 'technologies']")
      setTech(technologies)
    }

    exec()
  }, [])

  useEffect(() => {
    if (jobs.length > 0 && tech.length > 0 && projects.length > 0) {
      const timePassed = Date.now() - start
      const timer = timePassed > 1200 ? 0 : 1200 - timePassed
      setTimeout(() => {
        setIsLoading(false)
      }, timer)
    }
  }, [jobs, tech, projects])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="app">
          <Navigation />
          <Greet />
          <About />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
