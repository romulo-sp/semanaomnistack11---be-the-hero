const express = require('express');
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

routes.post('/Sessions', SessionController.create);

//abaixo ele buusca o metodo index, dentro do arquivo OngController e cria uma rota para ele (/ongs)
routes.get('/ongs', OngController.index );
//abaixo ele buusca o metodo create, dentro do arquivo OngController e cria uma rota para ele (/ongs)
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);



module.exports = routes;

