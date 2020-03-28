/**
 * Criou o connection com o banco no arquivo "connection.js", e agora abaixo vai importar estes dados
 */
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

//// Abaixo, ele cria um método que busca informações no banco com o connection, que selection * do banco
//// cria uma constante local chamada 'ongs', que será enviada via JSON para o frontend.


    async index (request,response) {
            const ongs = await connection('ongs').select('*');
        
            return response.json(ongs);
        },

//// aqui ele incluir o 'async' para informar que é assincrona e depois coloca um await 
////para informar ao node para esperar guardar as informações, e só depois continua a assincrona

    async create ( request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    /**
     * abaixo, vai criar uma conexão e criar a tabela 'ongs' dentro do banco. e o 'insert' é para inserir os dados.
     */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
       // console.log({id ,name, email, whatsapp, city, uf });
    
    return response.json({ id });

    }

}