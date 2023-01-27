import './section-title.scss'

interface ISectionTitle {
  numeration: string
  title: string
}

const SectionTitle: React.FC<ISectionTitle> = ({ numeration, title }) => {
  return (
    <h2 className="section-title__title">
      <span className="section-title__title--number">{numeration}.</span> {title}
      <span className="section-title__title--line"></span>
    </h2>
  )
}

export default SectionTitle
