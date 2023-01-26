import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: <string>import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: <string>import.meta.env.VITE_SANITY_PROJECT_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)


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