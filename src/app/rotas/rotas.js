const db = require('../../config/database');
const LivroDao = require('../infra/livroDao');


module.exports = (app) => {    
    app.get('/', function(req, resp){
        resp.send(
            `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do código</h1>
                </body>
            </html>
        `
        );
    });
    
    
    app.get('/livros', function(req, resp){

        const livroDao = new LivroDao(db);

        livroDao.lista()
            .then(livros => 
                resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros : livros                     
                    }               
                ))
            .catch(erro => console.log(erro));        
    });

    // Rota para o formulário de livros
    app.get('/livros/form', function(req, resp){
        resp.marko(require('../views/livros/form/form.marko'));
    });

    // Rota para salvar os dados do formulario de livros
    app.post('/livros', function(req, resp){
        
        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro))

    });

    // Rota para Deletar um livro da tabela livros
    app.delete('/livros/:id', function(req, resp){
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.remove(id)
            .then(()=>resp.status(200).end())
            .catch(erro => console.log(erro));
    })

    // Rota para Edição do registro da tabela de livros
    app.get('/livros/form/:id', function(req, resp){
        
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro => {
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    {livro}
                )
            })
            .catch(erro => console.log(erro));
    })

    // Rota para atualizar os dados do formulario de livros
    app.put('/livros', function(req, resp){
        
        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro))

    });

}

