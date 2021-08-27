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

const FilterGroup = props => {
  const {
    filtersValue,
    changeEmploymentType,
    changeSalaryRange,
    changeSearchQuery,
    fetchFilteredJobs,
    enterSearch,
  } = props
  const {employmentType, salaryRange, search} = filtersValue
  const employmentTypeValues = employmentType.join(',')

  const getEmploymentTypeFilterList = item => {
    const updateEmpType = () => {
      changeEmploymentType(item.employmentTypeId)
    }

    return (
      <li key={item.employmentTypeId} className="optionItem">
        <input
          type="checkbox"
          id={item.employmentTypeId}
          value={employmentTypeValues}
          onChange={updateEmpType}
          className="checkbox"
        />
        <label htmlFor={item.employmentTypeId} className="optionLabel">
          {item.label}
        </label>
      </li>
    )
  }

  const getSalaryRangeFilterList = item => {
    const updateSalaryRange = () => {
      changeSalaryRange(item.salaryRangeId)
    }

    return (
      <li key={item.salaryRangeId} className="optionItem">
        <input
          type="radio"
          name="radioGroup"
          id={item.salaryRangeId}
          onChange={updateSalaryRange}
          value={salaryRange}
          className="checkbox"
        />
        <label htmlFor={item.salaryRangeId} className="optionLabel">
          {item.label}
        </label>
      </li>
    )
  }

  const updateSearchQuery = event => {
    changeSearchQuery(event)
  }

  const onClickFetchFilterData = () => {
    fetchFilteredJobs()
  }

  const enterUpdateSearch = event => {
    enterSearch(event)
  }

  return (
    <div className="filters-group-container">
      <div className="search-container-mobile">
        <input
          type="search"
          className="search-input"
          onChange={updateSearchQuery}
          onKeyDown={enterUpdateSearch}
          value={search}
          placeholder="Search"
        />
        <div className="search-icon-div">
          <button
            type="button"
            onClick={onClickFetchFilterData}
            className="search-btn"
            testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
      <ProfileCard />
      <hr />
      <div className="filterDiv">
        <h1 className="filterType">Type of Employment</h1>
        <ul className="filterList">
          {employmentTypesList.map(item => getEmploymentTypeFilterList(item))}
        </ul>
      </div>
      <hr />
      <div className="filterDiv">
        <h1 className="filterType">Salary Range</h1>
        <ul className="filterList">
          {salaryRangesList.map(item => getSalaryRangeFilterList(item))}
        </ul>
      </div>
    </div>
  )
}

export default FilterGroup
