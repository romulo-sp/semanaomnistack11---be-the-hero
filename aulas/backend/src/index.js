
/*
*rota e recurso
****
*métodos HTTP:

*GET: Buscar uma informação do back-end
*POST: Criar uma informação no back-end
*PUT: Alterar uma informação no back-end
*DELETE: Deletar uma informação no back-end
*/


/*
*Tipos de parametros
****
* Query params: Parametros nomeados enviados na rota após "?" (filtros, paginação)
* Route Params: Parametros utilizados para identificar recursos
* Request Body: 
*/

/**
 * Driver: SELECT * FROM users
 * Query Builder: Table('user').select('*').where()
 *  
 */

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express()

app.use(cors());
app.use(express.json());

app.use(routes);


app.listen(3333)




