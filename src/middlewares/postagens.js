const { 
    schemaCadastroOuAtualizacaoPostagem 
} = require( "../validations/postagens" );
const conexao = require( "../database/conexao" );

const validarBodyRequisicaoPostagem = async ( req, res, next ) => {
    try {
        await schemaCadastroOuAtualizacaoPostagem.validate( req.body );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const verificarPostagemExiste = async ( req, res, next ) => { 
    try {
        const { id: idPostagem } = req.params;
        const { usuario } = req;

        const queryPostagemExistente = "SELECT * FROM postagens WHERE id = $1 AND id_usuario = $2";
        const { rowCount: postagemExistente } = await conexao.query( queryPostagemExistente, [ idPostagem, usuario.id ] );

        if ( postagemExistente === 0 ) {
            return res.status( 404 ).json( "A postagem não foi encontrada." );
        }

        next();
    } catch (error) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarBodyRequisicaoPostagem,
    verificarPostagemExiste, 
};
