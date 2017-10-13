const express = require('express')
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
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
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
    res.render('index',{
        stripePublishableKey: keys.stripePublishableKey
    })
})
app.post('/charge', (req, res) => {
    const amount = 250 * 100
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then((customer) => {
        stripe.charges.create({
            amount,
            description: 'new book to porgrammers',
            currency: 'mxn',
            customer: customer.id
        })
        .then(charge => res.render('success'))
    })
    console.log(req.body)
    
})
app.listen(port, () => {
    console.log("Server running  on port :" + port)
})