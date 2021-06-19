const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// // ? Password Encryption (Hashing) can be done here
// // ? => You can run 'Pre' function on model that will run Just before saving document if mentioned 'save'
// // ? Note => The function you pass in argument should not be arrow function here, and must be normal function declaration 
// UserSchema.pre('save', async function(next){
//     if(!this.isModified('password')){  //? Check if password is not modified : This represents 'user' for password from controller function 
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10) // ? generates salt
//     this.password = await bcrypt.hash(this.password, salt) // ? Hashes password coming from controller 
//     return next()
// })


const User = mongoose.model('User', UserSchema)

module.exports = User