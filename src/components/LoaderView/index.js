import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const LoaderView = () => (
  <div className="loader-container" testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
  </div>
)

export default LoaderView
