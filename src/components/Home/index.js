import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const Home = () => (
  <>
    <Navbar />
    <div className="home-container">
      <div className="title-container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that your abilities and potential{' '}
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
