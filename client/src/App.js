import './scss/style.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home'
import ProtectedRoutes from './routes/ProtectedRoutes'

const App = () => {
    return (
        <Router>
            <div className="app_wrapper">
                <div className="main">
                    <Switch>
                        <ProtectedRoutes exact path='/' component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/forgotpassword" component={ForgotPassword} />
                        <Route exact path="/resetpassword/:resetToken" component={ResetPassword} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;