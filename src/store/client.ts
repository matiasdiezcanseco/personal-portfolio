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


interface Metadata {
  _createdAt: string
  _type: string
  _updatedAt: string
  _id: string
  _rev: string
}

export interface Project extends Metadata {
  name: string
  description: string
  imageUrl: string
  tags: string[]
  featured: boolean
  gitUrl: string
  prodUrl: string
  
}

export interface Job extends Metadata {
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
  
}

export interface Technology extends Metadata {
  name: string
  description: string
  url: string
  imageUrl: string
  
}

export interface Certificate extends Metadata {
  name: string
  description: string
  courseUrl: string
  certUrl: string
 
}