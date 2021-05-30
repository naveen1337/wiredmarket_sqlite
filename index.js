const express = require('express')
require("dotenv").config()

const app = express()

// Global Middlware Initialization 
app.use(express.json())



// Routes Initialization 
app.use('/admin',require('./routes/adminRoutes'))
app.use('/category',require('./routes/categoryRoutes'))
app.use('/product',require('./routes/productRoutes'))
app.use('/orders',require('./routes/orderRoutes'))



app.get('/',(req,res) =>{
	res.json({
		'Instance':'Natyacharya Book Store',
		"status":"live"
	})
})

app.listen(5000,()=> console.log('App Listening on 5000'))