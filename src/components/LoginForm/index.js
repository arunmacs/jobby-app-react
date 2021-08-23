import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userNameInput: '',
    passwordInput: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {
      expires: 1,
      path: '/',
    })
    this.setState({userNameInput: '', passwordInput: '', showErrorMsg: false})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userNameInput, passwordInput} = this.state
    const userCreds = {userNameInput, passwordInput}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCreds),
    }

    console.log(loginUrl, options)

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(response)

    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  handleUserNameInput = event => {
    this.setState({userNameInput: event.target.value, showErrorMsg: false})
  }

  handleUserPasswordInput = event => {
    this.setState({passwordInput: event.target.value, showErrorMsg: false})
  }

  render() {
    const {userNameInput, passwordInput, showErrorMsg, errorMsg} = this.state

    return (
      <div className="main-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website-logo"
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
                value={userNameInput}
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
                value={passwordInput}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            <p className="error-msg">{showErrorMsg && errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
