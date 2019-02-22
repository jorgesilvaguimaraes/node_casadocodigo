class LivroDao {

    constructor(bd)
    {
        this._bd = bd;
    }


    lista()
    {
        return new Promise((resolve, reject) => {
            this._bd.all(
                'SELECT * FROM livros', 
                (erro, resultados) => {
                    if(erro) 
                        return reject('Não foi possível listar os livros!')
                    return resolve(resultados)
                }
            )
        });               
    }


    adiciona(livro)
    {
        return new Promise( (resolve, reject) =>{
            this._bd.run(`
                INSERT INTO LIVROS (
                    titulo, 
                    preco, 
                    descricao
                    ) VALUES (?,?,?)            
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                erro => {
                    if(erro)
                    {
                        console.log(erro);
                        return reject('Não foi possível adicionar o livro!')
                    }

                    resolve();
                }        
            )
        })
    }

    buscaPorId(id)
    {
        return new Promise( (resolve, reject) => {
            this._bd.get(
                `SELECT *
                 FROM livros
                 WHERE id = ?`,
                 [id],
                 (erro, livro) => {
                     if(erro)
                     {
                         return reject('Não foi possível encontrar o livro!');
                     }
                     resolve(livro);
                 }
            )
        });
    }


    atualiza(livro)
    {
        return new Promise((resolve, reject)=>{
            this._bd.run(
                `
                    UPDATE livros SET
                    titulo = ?,
                    preco  = ?,
                    descricao = ?
                    WHERE id = ?
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                erro => { 
                    if(erro)
                    {
                        return reject('Não foi possível atualizar o livro!');
                    }
                    resolve();
                });
        });
    }

    remove(id)
    {
        return new Promise((resolve, reject) => {
            this._bd.get(
                `DELETE 
                 FROM livros
                 WHERE id = ?`,
                 [id],
                 (erro) => {
                     if(erro)
                     {
                         return reject('Não foi possível remover o livro!');
                     }
                     return resolve();
                 }
            )
        });

    }

}


module.exports = LivroDao;