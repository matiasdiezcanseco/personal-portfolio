import { Job } from '../../../store/state'
import './JobMenu.scss'

interface JobMenuType {
  jobs: Job[]
  selectedId: string
  onSelect: (arg: string) => void
}

const JobMenu: React.FC<JobMenuType> = ({ jobs, selectedId, onSelect }) => {
  return (
    <div className="jobmenu">
      {jobs.map((j) => {
        return (
          <div
            key={j._id}
            className={`jobmenu__item ${selectedId === j._id ? 'jobmenu__item--selected' : ''}`}
            onClick={() => onSelect(j._id)}
            onKeyUp={() => onSelect(j._id)}
          >
            {j.company}
          </div>
        )
      })}
    </div>
  )
}

export default JobMenu
