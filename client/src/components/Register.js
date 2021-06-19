import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import IconEye from '../assets/IconEye'
import IconEyeSlash from '../assets/IconEyeSlash'

const Register = () => {
    const { register, watch, handleSubmit, reset, formState:{ errors } } = useForm({
        mode: 'onBlur'
    })
    const watchPassword = watch('password', '') // ? This will watch value of Password Field
    const [passwordShown, setPasswordShown] = useState(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

    // ? Handle Submit Action
    const onSubmit = async(data, event) => {
        event.preventDefault()
        console.log('User Details',data)
        const url = `${process.env.REACT_APP_API_URL}/register`
        const options ={
            headers: {
                "Content-Type": `application/json`
            }
        }
        await axios.post(url, data, options).then( async (response) => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='register_form main_form'>
            <h3>Register</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id='username' name='username' placeholder='Enter username' { ...register('username', {
                        required: 'Please enter username' 
                    })} 
                    />
                    { errors.username && ( <span className="error_msg">{errors.username.message}</span> ) }
                </div>

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
                            required: 'Please enter password',
                            minLength: {
                                value: 8,
                                message:
                                    'Password should be atleast 8 characters.',
                            }, 
                        })}  
                        />
                        <span className='icon' onClick={() => setPasswordShown(!passwordShown)}> { passwordShown ? <IconEyeSlash/> : <IconEye/> } </span>
                    </div>
                    { errors.password && ( <span className="error_msg">{errors.password.message}</span> ) }
                </div>

                <div className="input_group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <div className="icon_input">
                        <input type={`${confirmPasswordShown ? 'text' : 'password'}`} id='confirmPassword' name='confirmPassword' placeholder='Enter password to confiirm' { ...register('confirmPassword', {
                            required: 'Please enter password to confirm',
                            validate: (value) => value === watchPassword || 'Password and Confirm password should match', 
                        })} 
                        />
                        <span className='icon' onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}>  { confirmPasswordShown ? <IconEyeSlash/> : <IconEye/> } </span>
                    </div>
                    { errors.confirmPassword && ( <span className="error_msg">{errors.confirmPassword.message}</span> ) }
                </div>
                
                <div className="url sign_in">
                    <Link to='/login'> Already Registered ? </Link>
                </div>

                <div className="submit_btn">
                    <button type="Submit"> Register </button>
                </div>
            </form>
        </div>
    )
}

export default Register
