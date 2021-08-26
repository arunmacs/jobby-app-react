import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    title,
    jobDescription,
    location,
    employmentType,
    rating,
  } = similarJobItem

  console.log()

  return (
    <li id="similar-job-item-card" style={{margin: '5px 10px'}}>
      <div className="company-logo-title-div">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <p className="description-text">Description</p>
      <p className="job-description">{jobDescription}</p>
      <div className="company-location-div">
        <div className="location-job-type-div">
          <div className="location-job-type-sub-div">
            <BsFillBriefcaseFill className="location-job-type-icon" />
            <p className="location-job-type">{location}</p>
          </div>
          <div className="location-job-type-sub-div">
            <BsFillBriefcaseFill className="location-job-type-icon" />
            <p className="location-job-type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
