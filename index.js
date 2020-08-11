const express = require('express');
const router = require('./routes/api/listItems');
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


//Conneting to mongoose
mongoose.connect('mongodb://localhost/Todo-List', { useNewUrlParser: true })
  .then( ()=> console.log('Successfully connected to mongo...'))
  .catch( ()=> console.log('Couldnot connect to mongo...'))

const app = express();


//applying api json and url encodings
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



//import webpages
app.use(express.static(path.join( __dirname, 'public' )))



//using other server half
app.use('/api/listItems', router)


//appling host
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}...`))