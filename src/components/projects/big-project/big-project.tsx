import { useQuery } from '@tanstack/react-query'
import { find } from 'lodash'
import { useTranslation } from 'react-i18next'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { FiGithub } from 'react-icons/fi'

import useHover from '../../../hooks/use-hover'
import useLanguage from '../../../hooks/use-language'
import { IProject, urlFor } from '../../../store/client'
import { getTechnologies } from '../../../store/queries'
import './big-project.scss'

interface ProjectType {
  project: IProject
  dir: 'left' | 'right'
}

const ProjectBig: React.FC<ProjectType> = ({ project, dir }) => {
  const { t } = useTranslation(['projects'])
  const { language } = useLanguage()

  const [ref, isHovered] = useHover()
  const imgUrl = urlFor(project.imageUrl).width(700).url()

  const { data: tech } = useQuery({
    queryKey: ['technologies'],
    queryFn: getTechnologies,
  })

  const findUrl = (t: string) => {
    const selTech = find(tech, { name: t })
    return selTech?.url
  }

  const handleRedirection = () => {
    if (project.prodUrl) window.open(project.prodUrl, '_blank')
  }
  if (dir === 'right')
    return (
      <div className="projectbig">
        <div className="projectbig__header">
          <div className="projectbig__nav">
            <a target="_blank" href={project.gitUrl} rel="noreferrer">
              <FiGithub className="projectbig__icon" size={25} style={{ marginRight: '15px' }} />
            </a>
            <a target="_blank" href={project.gitUrl} rel="noreferrer">
              <BsBoxArrowUpRight className="projectbig__icon" size={25} />
            </a>
          </div>
          <div className="projectbig__title projectbig__title--right">
            {project.featured && <h2>{t('Highlighted')}</h2>}
            {!project.featured && <h2>{t('Name')}</h2>}
            <h1>{project[language as 'en'].name}</h1>
          </div>
        </div>
        <div className="projectbig__body">
          <div
            className="projectbig__image projectbig__image--right"
            style={{ backgroundImage: `url(${imgUrl})` }}
            onClick={handleRedirection}
            onKeyUp={handleRedirection}
          >
            <div
              ref={ref}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: isHovered ? '' : 'rgba(12, 39, 1, 0.377)',
                transition: 'background-color 300ms ease-in-out',
              }}
            ></div>
          </div>
          <div>
            <p className="projectbig__description projectbig__description--right">
              {project[language as 'en'].description}
            </p>
          </div>
          <p className="projectbig__tech projectbig__tech--right"> {t('Technologies')}</p>
          <ul className="projectbig__list projectbig__list--right">
            {project.tags.map((t) => {
              const url = findUrl(t)
              return (
                <li className="projectbig__item projectbig__item--right" key={t}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {t}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  else
    return (
      <div className="projectbig">
        <div className="projectbig__header">
          <div className="projectbig__title">
            {project.featured && <h2>{t('Highlighted')}</h2>}
            {!project.featured && <h2>{t('Name')}</h2>}
            <h1>{project[language as 'en'].name}</h1>
          </div>
          <div className="projectbig__nav">
            <a target="_blank" href={project.gitUrl} rel="noreferrer">
              <FiGithub className="projectbig__icon" size={25} style={{ marginRight: '15px' }} />
            </a>
            <a target="_blank" href={project.gitUrl} rel="noreferrer">
              <BsBoxArrowUpRight className="projectbig__icon" size={25} />
            </a>
          </div>
        </div>
        <div className="projectbig__body">
          <div
            className="projectbig__image"
            style={{ backgroundImage: `url(${imgUrl})` }}
            onClick={handleRedirection}
            onKeyUp={handleRedirection}
          >
            <div
              ref={ref}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: isHovered ? '' : 'rgba(12, 39, 1, 0.377)',
                transition: 'background-color 300ms ease-in-out',
              }}
            ></div>
          </div>
          <div>
            <p className="projectbig__description">{project[language as 'en'].description}</p>
          </div>
          <p className="projectbig__tech">{t('Technologies')}</p>
          <ul className="projectbig__list">
            {project.tags.map((t) => {
              const url = findUrl(t)
              return (
                <li className="projectbig__item" key={t}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {t}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
}

export default ProjectBig
