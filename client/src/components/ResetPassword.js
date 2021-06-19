import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import IconEye from '../assets/IconEye'
import IconEyeSlash from '../assets/IconEyeSlash'

const ResetPassword = () => {

    const { register, watch, handleSubmit, reset, formState:{ errors } } = useForm({
        mode: 'onBlur'
    })
    const watchPassword = watch('password', '') // ? This will watch value of Password Field
    const [passwordShown, setPasswordShown] = useState(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

    // ? Handle Submit Action
    const onSubmit = (credentials, event) => {
        event.preventDefault()
        console.log('User Details',credentials)
    }


    return (
        <div className='reset_form main_form'>
            <h3>Reset Password</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

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
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <div className="icon_input">
                        <input type={`${confirmPasswordShown ? 'text' : 'password'}`} id='confirmpassword' name='confirmpassword' placeholder='Enter password to confiirm' { ...register('confirmpassword', {
                            required: 'Please enter password to confirm',
                            validate: (value) => value === watchPassword || 'Password and Confirm password should match', 
                        })} 
                        />
                        <span className='icon' onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}>  { confirmPasswordShown ? <IconEyeSlash/> : <IconEye/> } </span>
                    </div>
                    { errors.confirmpassword && ( <span className="error_msg">{errors.confirmpassword.message}</span> ) }
                </div>
                
                <div className="submit_btn">
                    <button type="Submit"> Reset Password </button>
                </div>

            </form>
        </div>
    )
}

export default ResetPassword
