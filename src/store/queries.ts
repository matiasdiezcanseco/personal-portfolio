import { ICertificate, IJob, IProject, ITechnology, client } from './client'

export const getProjects = async () => {
  const projects = await client.fetch("*[_type == 'projects']")
  return projects as IProject[]
}

export const getJobs = async () => {
  const jobs = await client.fetch("*[_type == 'jobs']")
  return jobs as IJob[]
}

export const getTechnologies = async () => {
  const tech = await client.fetch("*[_type == 'technologies']")
  return tech as ITechnology[]
}

export const getCertificates = async () => {
  const tech = await client.fetch("*[_type == 'certificates']")
  return tech as ICertificate[]
}
