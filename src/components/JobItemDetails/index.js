import {Component} from 'react'
import Cookie from 'js-cookie'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Navbar from '../Navbar'
import './index.css'

const apiCall = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  noData: 'NODATA',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {apiJobItemStatus: apiCall.initial, jobDetails: {}, similarJobs: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJwtToken = () => {
    const token = Cookie.get('jwt_token')
    return token
  }

  getJobItemDetails = async () => {
    this.setState({apiJobItemStatus: apiCall.inProgress})
    const token = this.getJwtToken()
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const formattedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(item => ({
          imageUrl: item.image_url,
          name: item.name,
        })),
      }

      const formattedSimilarJobsData = data.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({
        jobDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobsData,
        apiJobItemStatus: apiCall.failure,
      })
    } else {
      this.setState({apiJobItemStatus: apiCall.failure})
    }
  }

  retryFetching = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetails = () => {
    const {jobDetails, similarJobs} = this.state
    console.log(jobDetails, similarJobs, 'Card')

    return (
      <div className="job-details-card-container">
        <h1>Job Item Details Here...</h1>
      </div>
    )
  }

  //   renderLoaderView = () => (
  //     <div className="loader-container" testid="loader">
  //       <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
  //     </div>
  //   )

  //   renderFailureView = () => (
  //     <div className="failure-view-div">
  //       <img
  //         src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
  //         alt="failure view"
  //         className="failure-view-img"
  //       />
  //       <h1 className="failure-heading">Oops! Something Went Wrong</h1>
  //       <p className="failure-caption">
  //         We cannot seem to find the page you are looking for
  //       </p>
  //       <button
  //         type="button"
  //         onClick={this.retryFetchingJobDetails}
  //         className="retry-btn"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   )

  renderApiJobDetailsStatusView = () => {
    const {apiJobItemStatus} = this.state

    switch (apiJobItemStatus) {
      case apiCall.inProgress:
        return <LoaderView />
      case apiCall.success:
        return this.renderJobItemDetails()
      case apiCall.failure:
        return <FailureView retryFetching={this.retryFetching} />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="job-details-main-container">
          {this.renderApiJobDetailsStatusView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
