const { findOne } = require('../models/User')
const User = require('../models/User')
const { validateRegisterInputs, validateLoginInputs, validateForgotPwdInputs } = require('../utils/validations')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const SECRET_KEY = process.env.JWT_SECRET
const TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION
const FRONTEND_URL = process.env.FRONTEND_URL

const sendEmail = require('../utils/sendEmail')

// ? Authentication Functions that will run on respective routes

exports.register = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body

    const {errors, valid} = validateRegisterInputs(username, email, password, confirmPassword)
    
    // ?  STEP:1 Validate User Data
    if(!valid){  
        return res.status(400).json({ success: false, errors })
    }

    // ? STEP:2 Check if User already exists with Username or Email
    const user_name = await User.findOne({ username })
    const user_email = await User.findOne({ email })

    if(user_name){
        return res.status(400).json({ success: false, errors: { username: 'This username is taken' } })
    }else if(user_email){
        return res.status(400).json({ success: false, errors: { email: 'This email is taken' } })   
    }


    // ? STEP:3 Hash Password before saving to DB
    hashedPassword = await bcrypt.hash(password, 12)

    // ? STEP:4 Create User Object & save to DB
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString() // Storing as date & converting Date to String
    })
    const user = await newUser.save();

    // ? You can issue a Token if you want to Login user after Registration otherwise comment it
    // // ? STEP:5 Creating Auth Token for user before returning data
    // const token = jwt.sign({
    //     id: user._id
    // }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION })

    // ? Returning Data

    return res.status(201).json({ success: true, user })  

}

exports.login = async(req, res, next) => {
    const { email, password } = req.body

    // ?  STEP:1 Validate User Data
    const { errors, valid } = validateLoginInputs(email, password)
    if (!valid) {
        return res.status(400).json({ success: false, errors })
    }

    // ? STEP:2 Find User from DB
    const user = await User.findOne({ email })
    if(!user){
        errors.general = "User with this email not found"
        return res.status(404).json({ success: false, errors })
    }

    // ? STEP:3 If User found, Verify Passwords from DB
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        // ? If Passwords don't match
        errors.general = 'Invalid Credentials!'
        return res.status(404).json({ success: false, errors })
    }else{
        // ? Passwords match, issue a Token & return user with token

        const token = jwt.sign({
            id: user._id
        }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION })

        return res.status(201).json( { success: true, user, token } )
    }
    
}

exports.forgotpassword = async(req, res, next) => {
    const { email } = req.body
    // ?  STEP:1 Validate User Data
    const { errors, valid } = validateForgotPwdInputs(email)
    
    if(!valid){
        return res.status(400).json({ success: false, errors })
    }else{
        try {
            // ?  STEP:2 Verify if user exists in DB with Email
            const user = await User.findOne({ email })

            if(!user){
                // ? IF user doesn't exists
                errors.general = "Email could not be sent"
                return res.status(400).json({ success: false, errors })
            }else{
                // ? STEP:3 IF user exists, create ResetToken & ResetToken Expiry & save Document to DB
                const resetToken = crypto.randomBytes(20).toString('hex');

                const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
                const resetPasswordExpire = Date.now() + 10 * ( 60 * 1000 );  // ? Expiry Time set to 10 mins later, to changes minutes, replace '10' by minutes count

                user.resetPasswordToken = resetPasswordToken
                user.resetPasswordExpire = resetPasswordExpire

                await user.save() // ? Save DOC


                // ? STEP:4 Create Reset URL, Message & Email User
                const resetUrl = `${FRONTEND_URL}/resetpassword/${resetPasswordToken}`
                const message = `
                    <h1>You have requested a password reset</h1>
                    <p> Please go to this link to reset your password. </p>
                    <a href=${resetUrl} clicktracking=off> ${resetUrl} </a>
                `

                try {
                    // ? Sending Email
                    await sendEmail({
                        to: user.email,
                        subject: 'Password Reset Request',
                        text: message,
                    })

                    return res.status(200).json({ success: true, message: "Email Sent! Please check your inbox to reset password" })
                } catch (error) {
                    // ? If Error in sending email
                    user.resetPasswordToken = undefined
                    user.resetPasswordExpire = undefined

                    await user.save() // ? Save DOC

                    errors.general = "Email could not be sent"
                    return res.status(500).json({ success: false, errors })
                }

            }
        } catch (error) {
            next(error)
        }
    }

}

exports.resetpassword = async(req, res, next) => {
    const resetPasswordToken = req.params.resetToken
    // ? STEP:1 Get Token from request & Match user with that reset token in DB
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() } // ? Fetch only that user whose reset password time is not expired & is still in time period
        })

        if(!user){
            // errors.general = "Invalid reset token or token Expired"
            return res.status(400).json({ success: false, message: "Invalid reset token or token Expired" })
        }else{
            user.password = await bcrypt.hash(req.body.password, 12)
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            return res.status(200).json({ success: true, message: "Password reset successful" })
        }

    } catch (error) {
        next(error)   
    }
}