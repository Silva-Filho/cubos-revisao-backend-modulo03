const conexao = require( "../database/conexao" );

const bcrypt = require( "bcrypt" );

const cadastrar = async ( req, res ) => {
    try {
        const { nome, email, senha } = req.body;

        const senhaCriptografada = await bcrypt.hash( senha, 10 );

        const queryCadastroUsuario = "insert into usuarios (nome, email, senha) values ($1, $2, $3)";
        const { rowCount } = await conexao.query( queryCadastroUsuario, [ nome, email, senhaCriptografada ] );

        if ( rowCount === 0 ) {
            return res.status( 400 ).json( "Não foi possível cadastrar o usuário." );
        }

        return res.status( 201 ).json( "Usuário cadastrado com sucesso." );
    } catch ( error ) {
        return res.status( error.message );
    }
};

module.exports = {
    cadastrar
};
