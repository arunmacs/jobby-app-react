import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    this.setState({userName: '', password: '', showErrorMsg: false})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userCreds = {username: userName, password}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCreds),
    }

    // console.log(loginUrl, options)

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  handleUserNameInput = event => {
    this.setState({userName: event.target.value, showErrorMsg: false})
  }

  handleUserPasswordInput = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  renderForm = () => {
    const {userName, password, showErrorMsg, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="form-website-logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">
            <label htmlFor="userName-input" className="input-label">
              USERNAME
            </label>
            <input
              id="userName-input"
              type="text"
              className="input"
              onChange={this.handleUserNameInput}
              value={userName}
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="userPassword-input" className="input-label">
              PASSWORD
            </label>
            <input
              id="userPassword-input"
              type="password"
              className="input"
              onChange={this.handleUserPasswordInput}
              value={password}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p className="error-msg">{showErrorMsg && errorMsg}</p>
        </form>
      </div>
    )
  }

  render() {
    const token = Cookie.get('jwt_token')

    if (token) {
      return <Redirect to="/" />
    }
    return <div className="main-container">{this.renderForm()}</div>
  }
}

export default LoginForm
