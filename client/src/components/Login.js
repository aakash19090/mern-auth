import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import IconEye from '../assets/IconEye'
import IconEyeSlash from '../assets/IconEyeSlash'


const Login = () => {

    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        mode: 'onBlur'
    })
    const [passwordShown, setPasswordShown] = useState(false)

     // ? Handle Submit Action
     const onSubmit = (credentials, event) => {
        event.preventDefault()
        console.log('Credentials',credentials)
    }

    return (
        <div className='login_form main_form'>
            <h3>Login</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' name='email' placeholder='Enter email' { ...register('email', {
                        required: 'Please enter email',
                        pattern: {
                            value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                            message: 'Please enter a valid email Id',
                        } 
                    })} 
                    />
                    { errors.email && ( <span className="error_msg">{errors.email.message}</span> ) }
                </div>

                <div className="input_group">
                    <label htmlFor="password">Password:</label>
                    <div className='icon_input'>
                        <input type={`${passwordShown ? 'text' : 'password'}`} id='password' name='password' placeholder='Enter password' { ...register('password', {
                            required: 'Please enter password'
                        })}  
                        />
                        <span className='icon' onClick={() => setPasswordShown(!passwordShown)}> { passwordShown ? <IconEyeSlash/> : <IconEye/> } </span>
                    </div>
                    { errors.password && ( <span className="error_msg">{errors.password.message}</span> ) }
                </div>

                <div className="url forgot">
                    <Link to='/forgotpassword'> Forgot password ? </Link>
                </div>

                <div className="url sign_up">
                    <Link to='/register'> Sign Up ? </Link>
                </div>
               

                <div className="submit_btn">
                    <button type="Submit"> Login </button>
                </div>
            </form>
        </div>
    )
}

export default Login
