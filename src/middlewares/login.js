const bcrypt = require( "bcrypt" );

const { schemaLogin } = require( "../validations/login" );

const validarBodyLogin = async ( req, res, next ) => {
    try {
        await schemaLogin.validate( req.body );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const validarSenhaUsuario = async ( req, res, next ) => {
    try {
        const { senha } = req.body;
        const { senha: senhaCadastrada } = req.usuario;
        // eslint-disable-next-line no-undef
        // @ts-ignore
        const pwdVerified = await bcrypt.compare( senha, senhaCadastrada );

        if ( !pwdVerified ) {
            return res.status( 400 ).json( "A senha está incorreta." );
        }

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarBodyLogin, 
    validarSenhaUsuario,
};
