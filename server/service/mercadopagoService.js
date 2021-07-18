const mercadopago = require("mercadopago")

class mercadopagoService{

    createPreference = async (preference) => {
        return mercadopago.preferences.create(preference)
    }
}

module.exports = mercadopagoService