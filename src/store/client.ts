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


interface Metadata<T> {
  en: T
  es: T
  _createdAt: string
  _type: string
  _updatedAt: string
  _id: string
  _rev: string
}

export interface IProject extends Metadata<
{
  name: string
  description: string
} > {
  imageUrl: string
  tags: string[]
  featured: boolean
  gitUrl: string
  prodUrl: string
  
}

export interface IJob extends Metadata<
{ 
  description: string 
  responsabilities: string[] 
} > {
  name: string
  company: string
  companyUrl: string
  initialDate: string
  finalDate: string
  active: boolean
  imgUrl: string
  tags: string[]
}

export interface ITechnology extends Metadata<unknown> {
  description: string
  name: string
  url: string
  imageUrl: string
}

export interface ICertificate extends Metadata< 
{
  name: string
  description: string
} > {
  courseUrl: string
  certUrl: string
}