const { schemaCadastroUsuario } = require( "../validations/usuarios" );
const conexao = require( "../database/conexao" );

const validarBodyCadastroUsuario = async ( req, res, next ) => {
    try {
        await schemaCadastroUsuario.validate( req.body );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const verificarEmail = async ( req, res, next ) => {
    try {
        const { email } = req.body;
        const { url } = req;

        const queryVerificarEmail = `
            select 
                id, 
                nome, 
                email, 
                senha 
            from usuarios 
            where email = $1
        `;
        const usuario = await conexao.query( queryVerificarEmail, [ email ] );

        if ( url.includes( "/usuarios" ) && usuario.rowCount > 0 ) {
            return res.status( 400 ).json( "Usuário já foi cadastrado." );
        }

        if ( url.includes( "/login" ) && usuario.rowCount === 0 ) {
            return res.status( 400 ).json( "Usuário não encontrado." );
        }

        req.usuario = usuario.rows[ 0 ];

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarBodyCadastroUsuario,
    verificarEmail,
};
