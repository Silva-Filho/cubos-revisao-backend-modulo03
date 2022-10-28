const conexao = require( "../database/conexao" );

const registerPost = async ( req, res ) => {
    try {
        const { texto } = req.body;
        const { usuario } = req;

        const queryAdicionarPostagem = `
            INSERT INTO postagens (id_usuario, texto) 
            VALUES ($1, $2)
        `;
        const { rowCount } = await conexao.query( queryAdicionarPostagem, [ usuario.id, texto ] );

        if ( rowCount === 0 ) {
            return res.status( 400 ).json( "Não foi possível cadastrar a postagem." );
        }

        return res.status( 200 ).json( "Postagem foi cadastrada." );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const listarTodasPostagens = async ( req, res ) => {
    try {
        const { rows: postagens } = await conexao.query( "SELECT * FROM postagens" );

        return res.status( 200 ).json( postagens );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const listarPostagensUsuario = async ( req, res ) => {
    const { usuario } = req;

    try {
        const { rows: postagens } = await conexao.query( "SELECT * FROM postagens WHERE id_usuario = $1", [ usuario.id ] );

        return res.status( 200 ).json( postagens );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const updatePost = async ( req, res ) => {
    try {
        const { texto } = req.body;
        const { usuario } = req;
        const { id: idPostagem } = req.params;

        const queryAtualizarPostagem = `
            UPDATE postagens 
            SET texto = $1
            WHERE id = $2 AND id_usuario = $3
        `;
        const { rowCount: postagem } = await conexao.query( queryAtualizarPostagem, [ texto, idPostagem, usuario.id ] );

        if ( postagem === 0 ) {
            return res.status( 400 ).json( "Não foi possível cadastrar a postagem." );
        }

        return res.status( 200 ).json( "Postagem foi cadastrada." );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const excluirPostagem = async ( req, res ) => {
    try {
        const { id } = req.params;

        const { rowCount } = await conexao.query( "DELETE FROM postagens WHERE id = $1", [ id ] );

        if ( rowCount === 0 ) {
            return res.status( 400 ).json( "Não foi possível excluir a postagem." );
        }

        return res.status( 200 ).json( "Postagem excluída com sucesso." );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    listarTodasPostagens,
    listarPostagensUsuario,
    registerPost,
    updatePost,
    excluirPostagem
};
