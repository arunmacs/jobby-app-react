import './index.css'

const FailureView = props => {
  const {retryFetching} = props
  console.log()

  const retryFetchingData = () => {
    retryFetching()
  }

  return (
    <div className="failure-view-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-caption">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={retryFetchingData} className="retry-btn">
        Retry
      </button>
    </div>
  )
}
export default FailureView
