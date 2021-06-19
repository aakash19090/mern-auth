module.exports.validateRegisterInputs = (username, email, password, confirmPassword) => {
    const errors = {}

    // ? Username
    if(username.trim() === ''){
        errors.username = "Username can't be empty"
    }

    // ? Email
    if(email.trim() === ''){
        errors.email = "Email can't be empty"
    }else{
        const email_regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(email_regex)) {
            errors.email = "Invalid email address!"
        }
    }

    // ? Password
    if(password.trim() === ''){
        errors.password = "Password can't be empty"
    }else if(password !== confirmPassword){
        errors.password = "Passwords don't match!"
    }
    
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInputs = ( email, password ) => {
    const errors = {}

    // ? Email
    if(email.trim() === ''){
        errors.email = "Email can't be empty"
    }else{
        const email_regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(email_regex)) {
            errors.email = "Invalid email address!"
        }
    }

    // ? Password
    if(password.trim() === ''){
        errors.password = "Password can't be empty"
    }
    
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateForgotPwdInputs = ( email ) => {
    const errors = {}

    // ? Email
    if(email.trim() === ''){
        errors.email = "Email can't be empty"
    }else{
        const email_regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(email_regex)) {
            errors.email = "Invalid email address!"
        }
    }
    
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}