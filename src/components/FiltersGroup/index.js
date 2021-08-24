import {BsSearch} from 'react-icons/bs'
import ProfileCard from '../ProfileCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = () => {
  console.log()

  return (
    <div className="filters-group-container">
      <div className="search-container-mobile">
        <input type="search" className="search-input" placeholder="Search" />
        <div className="search-icon-div">
          <BsSearch className="search-icon" />
        </div>
      </div>
      <ProfileCard />
    </div>
  )
}

export default FilterGroup
