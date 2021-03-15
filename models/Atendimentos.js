 const moment = require('moment')
 const conection = require('../infraestrutura/conection')

class Atendimento {

    adciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataEValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEValida,
                mensage: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres."
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conection.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json('erro')
    
                } else {
                    res.status(201).json(resultados)
                }
            })
        }

    }

    
}
module.exports = new Atendimento