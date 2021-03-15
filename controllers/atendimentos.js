const Atendimento = require('../models/Atendimentos')


module.exports = app => {
    
    app.get('/atendimentos', (req, res) =>res.send('Voce esta na rota de atendimentos GET'));
    app.post('/atendimentos', (req, res) => {
        
        const atendimento = req.body

        Atendimento.adciona(atendimento, res)
        
    
    
    })

};