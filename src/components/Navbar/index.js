import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Navbar = props => {
  console.log()

  const logOutSession = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  const navigateToHome = () => {
    const {history} = props
    history.push('/')
  }

  const renderNavbarMobile = () => (
    <ul className="nav-links-mobile">
      <li>
        <Link to="/">
          <AiFillHome className="nav-icon" />
        </Link>
      </li>
      <li>
        <Link to="/jobs">
          <BsFillBriefcaseFill className="nav-icon" />
        </Link>
      </li>
      <li>
        <button type="button" onClick={logOutSession} className="logout-icon">
          <FiLogOut className="nav-icon" />
        </button>
      </li>
    </ul>
  )

  const renderNavbarDesktop = () => (
    <ul className="nav-links-desktop">
      <li className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </li>
      <li>
        <button type="button" onClick={logOutSession} className="logout-btn">
          Logout
        </button>
      </li>
    </ul>
  )

  return (
    <nav className="navbar-container">
      <button type="button" onClick={navigateToHome} className="logo-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-website-logo"
        />
      </button>
      {renderNavbarMobile()}
      {renderNavbarDesktop()}
    </nav>
  )
}

export default withRouter(Navbar)
