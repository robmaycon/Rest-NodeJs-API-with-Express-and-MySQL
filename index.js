const customExpress = require('./config/customExpress')
const conection = require('./infraestrutura/conection')
const Tabelas = require('./infraestrutura/Tabelas')

conection.connect(erro =>{
    if (erro){
        console.log('erro de conexao')
    }else {
        console.log('conectado e funcionando')
        Tabelas.init(conection)
        const app = customExpress();
        
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
})