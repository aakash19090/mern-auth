const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    // ? STEP:1 Create Transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // ? STEP:2 Configure Mail Options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    }

    // ? STEP:3 Send Email
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
        }
    })
}

module.exports = sendEmail