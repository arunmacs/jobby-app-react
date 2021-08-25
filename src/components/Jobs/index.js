import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import ProfileCard from '../ProfileCard'
import Navbar from '../Navbar'
import FilterGroup from '../FiltersGroup'
import './index.css'

class Jobs extends Component {
  state = {employmentType: '', salaryRange: '', search: ''}

  componentDidMount() {
    this.fetchJobsData()
  }

  fetchJobsData = () => {
    const {employmentType, salaryRange, search} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType},PARTTIME&minimum_package=${salaryRange}&search=${search}`
  }

  changeEmploymentType = id => {
    this.setState({employmentType: id})
  }

  changeSalaryRange = id => {
    this.setState({salaryRange: id})
  }

  changeSearchQuery = event => {
    this.setState({search: event.target.value})
  }

  render() {
    const {employmentType, salaryRange, search} = this.state
    console.log(employmentType, salaryRange, search)

    return (
      <>
        <Navbar />
        <div className="jobs-container">
          <FilterGroup
            filtersValue={{employmentType, salaryRange, search}}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            changeSearchQuery={this.changeSearchQuery}
          />
          <div className="jobs-list">
            <div className="search-container-desktop">
              <input
                type="search"
                className="search-input"
                value={search}
                onChange={this.changeSearchQuery}
                placeholder="Search"
              />
              <div className="search-icon-div">
                <BsSearch className="search-icon" />
              </div>
            </div>
            <h1>Job Items here</h1>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
