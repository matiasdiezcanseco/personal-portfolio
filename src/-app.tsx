import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import './App.scss'
import About from './components/-about/about'
import Contact from './components/-contact/contact'
import Experience from './components/-experience/experience'
import Footer from './components/-footer/footer'
import Greet from './components/-greet/greet'
import Loading from './components/-loading/loading'
import Navigation from './components/-navigation/navigation'
import Projects from './components/-projects/projects'
import { client } from './store/client'
import { jobsState, projectsState, techlonogiesState } from './store/state'
import type { Job, Project, Technology } from './store/state'

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
