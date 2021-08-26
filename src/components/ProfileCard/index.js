import {Component} from 'react'
import './index.css'

class ProfileCard extends Component {
  state = {}

  render() {
    console.log()

    return (
      <div className="profile-card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
          alt="profile"
          className="profile-pic"
        />
        <h1 className="user-name">Arun Muniganti</h1>
        <p className="user-role">Full Stack Developer</p>
      </div>
    )
  }
}

export default ProfileCard
