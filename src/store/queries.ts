import { Certificate, Job, Project, Technology, client } from './client'

export const getProjects = async () => {
  const projects = await client.fetch("*[_type == 'projects']")
  return projects as Project[]
}

export const getJobs = async () => {
  const jobs = await client.fetch("*[_type == 'jobs']")
  return jobs as Job[]
}

export const getTechnologies = async () => {
  const tech = await client.fetch("*[_type == 'technologies']")
  return tech as Technology[]
}

export const getCertificates = async () => {
  const tech = await client.fetch("*[_type == 'certificates']")
  return tech as Certificate[]
}
