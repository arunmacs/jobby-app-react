import Navbar from '../Navbar'
import './index.css'

const NotFound = () => {
  console.log()

  return (
    <>
      <Navbar />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-img"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-caption">
          we’re sorry, the page you requested could not be found
        </p>
      </div>
    </>
  )
}

export default NotFound
