import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import ProfileCard from '../ProfileCard'
import Navbar from '../Navbar'
import FilterGroup from '../FiltersGroup'
import './index.css'

class Jobs extends Component {
  state = {}

  render() {
    return (
      <>
        <Navbar />
        <div className="jobs-container">
          <FilterGroup />
          <div className="jobs-list">
            <div className="search-container-desktop">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
              />
              <div className="search-icon-div">
                <BsSearch className="search-icon" />
              </div>
            </div>
            <h1>Job Items here</h1>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
