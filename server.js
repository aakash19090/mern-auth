require('dotenv').config({ path: './config.env' }); //? Importing config.env
const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

connectDB(); // ? Connect to MongoDB

const app = express();

app.use(express.json()); //? To parse the body requests into JSON ( needed when you pass form data to parse into JSON ) 
app.use(cors()); // ? TO Prevent CORS errors

app.use('/api/auth', require('./routes/auth')); // ? Use middleware to check if api endpoint in 'api/auth', then  redirect to './routes/auth'
app.use('/api/protected', require('./routes/protected')); // ? Protected Routes

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => { console.log(`Server is running at port : ${PORT}`) })

// ? 🚀  In case the server crashes due to mongoDB error or invalid connection string we can handle the long unreadable error in terminal in nice way 
// ? SOLUTION TO GET EXACT IDEA OF ERROR 🚀 : Below will only print error in Terminal instead of long Error string

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error : ${err}`)
    // server.close(() => process.exit(1))
})