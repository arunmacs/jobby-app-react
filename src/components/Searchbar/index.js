import {BsSearch} from 'react-icons/bs'
import './index.css'

const Searchbar = props => {
  const {enterSearch, changeSearchQuery, search, fetchFilteredJobs} = props

  const updateSearchQuery = event => {
    changeSearchQuery(event)
  }

  const onKeyEnterSearch = event => {
    enterSearch(event)
  }

  const onClickSearch = () => {
    fetchFilteredJobs()
  }

  return (
    <>
      <input
        type="search"
        className="search-input"
        value={search}
        onChange={updateSearchQuery}
        onKeyDown={onKeyEnterSearch}
        placeholder="Search on Job Role"
      />
      <div className="search-icon-div">
        <button
          type="button"
          className="search-btn"
          onClick={onClickSearch}
          testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    </>
  )
}

export default Searchbar
