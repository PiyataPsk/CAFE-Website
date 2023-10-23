const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const login = require('./routes/login')
const admin = require('./routes/admin')
const Product = require('./models/product')

app.set('view engine','ejs'); //set ejs
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(login)
app.use(admin)

app.get('/', async(req, res) => {
    const PRODUCTS = await Product.find();
    res.render('homepage.ejs',{products:PRODUCTS})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})