class paymentController{
    constructor(mercadopagosService){
        this.mercadopagosService = mercadopagosService
    }
    
    createPreference = async (req, res) => {

        const preference = {
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
        }

        try {
            const response = await this.mercadopagosService.createPreference(preference)
            res.json({id :response.body.id})

        } catch (error) {
            res.status(500).json({"message" : "Algo salio mal.", "code" : "error"})
            console.log(error)
        }
    
    }

    feedback = async(req, res) => {
        res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        })
    }
}

module.exports = paymentController