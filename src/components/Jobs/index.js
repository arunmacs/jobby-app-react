import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import JobItemCard from '../JobItemCard'
import Navbar from '../Navbar'
import FilterGroup from '../FiltersGroup'
import './index.css'

const apiCall = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  noData: 'NODATA',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    search: '',
    jobsList: [],
    apiStatus: apiCall.initial,
  }

  componentDidMount() {
    this.fetchJobsData()
  }

  getJwtToken = () => {
    const token = Cookie.get('jwt_token')
    return token
  }

  fetchJobsData = async () => {
    this.setState({apiStatus: apiCall.inProgress})
    const {employmentType, salaryRange, search} = this.state
    const employmentTypeValues = employmentType.join(',')
    const token = this.getJwtToken()
    // console.log(token)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeValues}&minimum_package=${salaryRange}&search=${search}`
    // console.log(apiUrl)

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      if (data.total !== 0) {
        const formattedData = data.jobs.map(item => ({
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          id: item.id,
          jobDescription: item.job_description,
          location: item.location,
          packagePerAnnum: item.package_per_annum,
          rating: item.rating,
          title: item.title,
        }))
        this.setState({jobsList: formattedData, apiStatus: apiCall.failure})
        // console.log(data)
      } else {
        this.setState({apiStatus: apiCall.noData})
      }
    } else {
      this.setState({apiStatus: apiCall.failure})
    }
  }

  changeEmploymentType = id => {
    const {employmentType} = this.state
    const isOptionChecked = employmentType.includes(id)

    if (isOptionChecked) {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(item => item !== id),
        }),
        this.fetchJobsData,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.fetchJobsData,
      )
    }
  }

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.fetchJobsData)
  }

  changeSearchQuery = event => {
    this.setState({search: event.target.value})
  }

  retryFetching = () => {
    this.fetchJobsData()
  }

  fetchFilteredJobs = () => {
    this.fetchJobsData()
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiCall.inProgress:
        return <LoaderView />
      case apiCall.success:
        return this.renderJobsListView()
      case apiCall.noData:
        return this.renderNoDataView()
      case apiCall.failure:
        return <FailureView retryFetching={this.retryFetching} />
      default:
        return null
    }
  }

  //   renderLoaderView = () => (
  //     <div className="loader-container" testid="loader">
  //       <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
  //     </div>
  //   )

  renderNoDataView = () => {
    console.log()

    return (
      <div className="failure-view-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-view-img"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-caption">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  //   renderFailureView = () => {
  //     console.log()

  //     return (
  //       <div className="failure-view-div">
  //         <img
  //           src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
  //           alt="failure view"
  //           className="failure-view-img"
  //         />
  //         <h1 className="failure-heading">Oops! Something Went Wrong</h1>
  //         <p className="failure-caption">
  //           We cannot seem to find the page you are looking for
  //         </p>
  //         <button
  //           type="button"
  //           onClick={this.retryFetchingJobsData}
  //           className="retry-btn"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     )
  //   }

  renderJobsListView = () => {
    const {jobsList} = this.state

    return (
      <>
        {jobsList.map(item => (
          <JobItemCard jobItem={item} key={item.id} />
        ))}
      </>
    )
  }

  render() {
    const {employmentType, salaryRange, search} = this.state
    // console.log(employmentType, salaryRange, search)

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
                placeholder="Search on Job Role"
              />
              <div className="search-icon-div">
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.fetchFilteredJobs}
                  testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <ul className="job-items-list-desktop">
              {this.renderApiStatusView()}
            </ul>
          </div>
          <ul className="job-items-list-mobile">
            {this.renderApiStatusView()}
          </ul>
        </div>
      </>
    )
  }
}
export default Jobs
