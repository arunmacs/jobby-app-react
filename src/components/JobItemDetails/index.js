import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Navbar from '../Navbar'
import SimilarJobItem from '../SimilarJobItem'
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
        apiJobItemStatus: apiCall.success,
      })
    } else {
      this.setState({apiJobItemStatus: apiCall.failure})
    }
  }

  retryFetching = () => {
    this.getJobItemDetails()
  }

  getSkillItems = item => {
    const {imageUrl, name} = item

    return (
      <li className="skill-item" key={name}>
        <img src={imageUrl} alt={name} className="skill-img" />
        <p className="skill-name">{name}</p>
      </li>
    )
  }

  renderJobItemDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      companyWebsiteUrl,
      lifeAtCompany,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobDetails

    return (
      <div className="job-details-card-container" key={id}>
        <div className="job-details-company-logo-title-div">
          <img
            src={companyLogoUrl}
            alt="website logo"
            className="job-details-company-logo"
          />
          <div className="job-details-job-title-rating-div">
            <h1 className="job-details-title">{title}</h1>
            <div className="job-details-rating-div">
              <BsFillStarFill className="job-details-star-icon" />
              <p className="job-details-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-company-location-package-div">
          <div className="job-details-location-job-type-div">
            <div className="job-details-location-job-type-sub-div">
              <MdLocationOn className="job-details-location-job-type-icon" />
              <p className="job-details-location-job-type">{location}</p>
            </div>
            <div className="job-details-location-job-type-sub-div">
              <BsFillBriefcaseFill className="job-details-location-job-type-icon" />
              <p className="job-details-location-job-type">{employmentType}</p>
            </div>
          </div>
          <p className="job-details-package">{packagePerAnnum}</p>
        </div>
        <div className="description-company-website-link-div">
          <h1 className="job-details-description-text">Description</h1>
          <a
            href={companyWebsiteUrl}
            className="external-link"
            target="_blank"
            rel="noreferrer"
          >
            Visit <FaExternalLinkAlt />
          </a>
        </div>
        <p className="job-details-job-description">{jobDescription}</p>
        <p className="job-details-description-text">Skills</p>
        <ul className="skills-list">
          {skills.map(item => this.getSkillItems(item))}
        </ul>
        <div className="life-at-company-div">
          <div className="life-at-company-sub-div">
            <h1 className="job-details-description-text">Life at Company</h1>
            <p className="job-details-job-description">
              {lifeAtCompany.description}
            </p>
          </div>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-at-company-img"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <div className="similar-jobs-main-container">
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(item => (
            <SimilarJobItem similarJobItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

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
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
