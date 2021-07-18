require('dotenv').config()
const express = require('express')
const app = express()
const mercadopago = require("mercadopago")
const router = require('./router/router')
const port = process.env.SERVER_PORT

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_SELLER) 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("../client"))
app.use('/', router)

app.get("/", function (req, res) {
    res.status(200).sendFile("index.html");
}); 

app.listen(port, () => {
    console.log("The server is now running on port " + port);
});