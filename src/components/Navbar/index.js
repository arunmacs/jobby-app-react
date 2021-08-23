import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Navbar = () => {
  console.log()

  const renderNavbarMobile = () => (
    <div className="nav-links-mobile">
      <Link to="/">
        <AiFillHome className="nav-icon" />
      </Link>
      <Link to="/jobs">
        <BsFillBriefcaseFill className="nav-icon" />
      </Link>
      <button type="button" className="logout-icon">
        <FiLogOut className="nav-icon" />
      </button>
    </div>
  )

  const renderNavbarDesktop = () => (
    <div className="nav-links-desktop">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </div>
      <div>
        <button type="button" className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <nav className="navbar-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website-logo"
        className="navbar-website-logo"
      />
      {renderNavbarMobile()}
      {renderNavbarDesktop()}
    </nav>
  )
}

export default Navbar
