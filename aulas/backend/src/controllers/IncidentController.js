const connection = require('../database/connection');

module.exports = {
//criando a requisição para listar os incidents (casos), que foram criados.. 
    async index(request,response) {
// criando a paginação: ele determina a pagina como "1";
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count(); // cria uma variavel 'count' para ser mostrada ao usuario

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // faz um join com as ongs, para trazer dado da ong do caso selecionado
        .limit(5) // limita 5 casos (incidents por linha)
        .offset((page - 1) * 5) // faz o calculo para mudança de paginas
        .select(['incidents.*',
                 'ongs.name',
                  'ongs.email',
                   'ongs.whatsapp',
                    'ongs.city',
                     'ongs.uf']);// aqui é um select, simples em javascript

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
//criando a requisição para criar os incidents (casos).. precisa criar um post com o authorization no Header
    async create(request,response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id]  = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },
//criando a requisição para deletar os incidents (casos), que foram criados.. precisa criar um delete com o authorization no Header
    async delete(request,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // uma query no java para conectar no banco, e seleciona somente o id que foi colocado na requisição
        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();
// caso a ong_id não exista, existe um if abaixo, para mostrar o erro demonstrado ( o codigo 401 é de unauthorized) (não autorizado)
        if(incident.ong_id != ong_id ) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};