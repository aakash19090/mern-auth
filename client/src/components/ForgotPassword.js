import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const ForgotPassword = () => {
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        mode: 'onBlur'
    })

     // ? Handle Submit Action
     const onSubmit = (email, event) => {
        event.preventDefault()
        console.log('Email',email)
    }

    return (
        <div className='forgot_form main_form'>
            <h3>Forgot Password</h3>

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

                <div className="url login">
                    <Link to='/login'> Back to login </Link>
                </div>

                <div className="submit_btn">
                    <button type="Submit"> Send </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
