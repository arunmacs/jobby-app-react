import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItemCard = props => {
  const {jobItem} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem
  //   console.log(props)

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-item-card">
        <div className="company-logo-title-div">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-title-rating-div">
            <h1 className="job-title">{title}</h1>
            <div className="rating-div">
              <BsFillStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="company-location-package-div">
          <div className="location-job-type-div">
            <div className="location-job-type-sub-div">
              <MdLocationOn className="location-job-type-icon" />
              <p className="location-job-type">{location}</p>
            </div>
            <div className="location-job-type-sub-div">
              <BsFillBriefcaseFill className="location-job-type-icon" />
              <p className="location-job-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <p className="description-text">Description</p>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItemCard
