const express = require('express')
const stripe = require('stripe')('sk_test_rzEaINjrKj6syFfkUXq3pU4y')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()
const port = process.env.PORT || 5000

//handlebars middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//set static folder
app.use(express.static(`${__diname}/public`))


app.listen(port, () => {
    console.log("Server running  on port :" + port)
})