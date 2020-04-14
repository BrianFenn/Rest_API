require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true }  )
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json()) // 'app.use()' "allows us to use any middleware that we want, is used when the server gets a request abut before it gets passed to your routes" 
                        // express.json() "allows us to accept JSON as a body istead of a post element or get element"

const subscribersRouter =  require('./routes/subscribers') 
                        // we need to create our routes and sense we are creating a subscriber API we will call it suberscribersRouter and it will route all of "our subscriber information"
                        // and the require will our program to use the routes/subscribers file to route to our subscriber information

app.use('/subscribers', subscribersRouter)
// app.use will tie the route to our connection 'localhost:3000/subscribers/sdfsd' 
//next, we will create our middleware in the subscriber.js file (or our app will crash)


app.listen(3000, () => console.log('Server Started'))
