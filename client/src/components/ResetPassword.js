import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconEye from '../assets/IconEye'
import IconEyeSlash from '../assets/IconEyeSlash'
import axios from 'axios'
import Loader from './Loader'

const toastSettings = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const ResetPassword = ({ history }) => {

    const { register, watch, handleSubmit, reset, formState:{ errors } } = useForm({
        mode: 'onBlur'
    })

    const watchPassword = watch('password', '') // ? This will watch value of Password Field
    const [passwordShown, setPasswordShown] = useState(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    
    // ? Handle Submit Action
    const onSubmit = async(data, e) => {
        e.preventDefault()
        setIsLoading(true)
        const url = `${process.env.REACT_APP_API_URL}${history.location.pathname}`
        const options ={
            headers: {
                "Content-Type": `application/json`
            }
        }
        
        const dataToSend={
            password: data.password
        }

        // ? Call Api
        await axios.put(url, dataToSend, options).then( async (response) => {
            
            setIsLoading(false)
            const apiResponse = response.data
            const isSuccess = apiResponse.success
            if(!isSuccess){
                // ? If has Error
                if(apiResponse.message){
                    toast.error(apiResponse.message, toastSettings)   
                }
                else if(Object.keys(apiResponse.errors).length > 0){
                    Object.entries(apiResponse.errors).map(([key, value], i) => {
                        toast.error(value, toastSettings)   
                    })
                }
                
            }else{
                toast.success(apiResponse.message, toastSettings)  
                history.push('/login') 
            }

        }).catch(err => {
            setIsLoading(false)
            toast.error(err, toastSettings)
        })
        reset( { password: '' }, { confirmpassword: '' })
    }


    return (
        <>  
            { isLoading ? <Loader/> : null } 
            <div className={`reset_form main_form ${isLoading ? 'loading' : ''}`}>
                <ToastContainer/>
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
        </>
    )
}

export default ResetPassword
