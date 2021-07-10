const express = require("express")
const app = express()
const mercadopago = require("mercadopago")
const dotenv = require('dotenv').config()
const port = process.env.SERVER_PORT

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_SELLER) 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("../client"))

app.get("/", function (req, res) {
    res.status(200).sendFile("index.html");
}); 

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [{
			title: req.body.description,
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: 'approved',
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function(request, response) {
    response.json({
       Payment: request.query.payment_id,
       Status: request.query.status,
       MerchantOrder: request.query.merchant_order_id
   })
});

app.listen(port, () => {
    console.log("The server is now running on port " + port);
});