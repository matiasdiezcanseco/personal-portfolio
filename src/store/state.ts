import { atom } from 'recoil'

export interface Project {
  name: string
  description: string
  imageUrl: string
  tags: string[]
  featured: boolean
  gitUrl: string
  prodUrl: string
  _createdAt: string
  _type: string
  _updatedAt: string
  _id: string
  _rev: string
}

export interface Job {
  name: string
  company: string
  companyUrl: string
  initialDate: string
  finalDate: string
  active: boolean
  description: string
  imgUrl: string
  tags: string[]
  responsabilities: string[]
  _createdAt: string
  _type: string
  _updatedAt: string
  _id: string
  _rev: string
}

export interface Technology {
  name: string
  description: string
  url: string
  imageUrl: string
  _createdAt: string
  _type: string
  _updatedAt: string
  _id: string
  _rev: string
}

const projectsState = atom({
  key: 'projectsState',
  default: <Project[]>[],
})

const jobsState = atom({
  key: 'jobsState',
  default: <Job[]>[],
})

const techlonogiesState = atom({
  key: 'techlonogiesState',
  default: <Technology[]>[],
})

export { projectsState, jobsState, techlonogiesState }
