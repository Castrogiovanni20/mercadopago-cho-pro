const express = require('express')
const router = express.Router()

const mercadopagoService = require('../service/mercadopagoService')
const mercadopagoServiceInstance = new mercadopagoService()

const paymentsController = require('../controller/paymentsController')
const paymentsInstance = new paymentsController(mercadopagoServiceInstance)

router.post('/create_preference', paymentsInstance.createPreference)
router.get('/feedback', paymentsInstance.feedback)

module.exports = router