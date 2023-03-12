//load env variables
if (process.env.NODE_ENV != 'production') { //deploy in heroku like dont need this
    require('dotenv').config()
}

//import dependencies
const express = require('express')
const cors = require('cors')//////////////cor1
const cookieParser = require('cookie-parser')
const connectToDb = require("./config/connectToDb")
const notesController = require('./controllers/notesController')
const userController = require('./controllers/userController')
const requireAuth=require('./middleware/requireAuth')

//create an express app
const app = express()
connectToDb()

//configure an express app
app.use(express.json())
app.use(cors(
    {
        origin:true,
        credentials:true
    }/// the contents  in bracket is used after cookies and jwt since in react app
))//////cor2
app.use(cookieParser())


//Routing
app.post('/signup',userController.signup)
app.post('/login',userController.login)
app.get('/logout',userController.logout)
app.get('/check-auth',requireAuth,userController.checkAuth)

app.get('/notes', notesController.fetchNotes)
app.get('/notes/:id', notesController.fetchNote)
app.post('/notes', notesController.createNote)
app.put('/notes/:id', notesController.updateNote)
app.delete('/notes/:id', notesController.deleteNote)



//start our server
app.listen(process.env.PORT)