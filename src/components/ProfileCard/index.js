import {Component} from 'react'
import Cookie from 'js-cookie'
import LoaderView from '../LoaderView'
import './index.css'

const apiCall = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  noData: 'NODATA',
  failure: 'FAILURE',
}

class ProfileCard extends Component {
  state = {apiProfileStatus: apiCall.initial, profileData: []}

  componentDidMount() {
    this.fetchProfileData()
  }

  getJwtToken = () => {
    const token = Cookie.get('jwt_token')
    return token
  }

  fetchProfileData = async () => {
    this.setState({apiProfileStatus: apiCall.inProgress})
    const token = this.getJwtToken()

    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const formattedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: formattedProfileData,
        apiProfileStatus: apiCall.success,
      })
      //   console.log(formattedProfileData)
    } else {
      this.setState({apiProfileStatus: apiCall.failure})
    }
  }

  retryFetchingProfileData = () => {
    this.fetchProfileData()
  }

  //   renderLoaderView = () => (
  //     <div className="loader-container" testid="loader">
  //       <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
  //     </div>
  //   )

  renderProfileCard = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    console.log()

    return (
      <div className="profile-card-container">
        <img src={profileImageUrl} alt="profile" className="profile-pic" />
        <h1 className="user-name">{name}</h1>
        <p className="user-role">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        onClick={this.retryFetchingProfileData}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiProfileStatus} = this.state

    switch (apiProfileStatus) {
      case apiCall.inProgress:
        return <LoaderView />
      case apiCall.success:
        return this.renderProfileCard()
      case apiCall.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProfileCard
