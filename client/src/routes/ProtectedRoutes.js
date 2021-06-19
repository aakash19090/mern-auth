import { Redirect, Route } from 'react-router-dom'

// ? Checks first the authToken in localstorage. If found then render the component otherwise Redirect to Login
const ProtectedRoutes = ({ component: Component, ...rest }) => {
    
    const isTokenPresent = localStorage.getItem('authToken') 

    return (
        <Route {...rest}
            render={(props) => (
                isTokenPresent ?<Component {...props} /> : <Redirect to='/login' /> 
            )}
        />
    )
}

export default ProtectedRoutes
