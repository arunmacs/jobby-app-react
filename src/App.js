import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
  </Switch>
)

export default App
