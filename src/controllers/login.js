const jwt = require( "jsonwebtoken" );

const secret = process.env.SECRET;

const login = async ( req, res ) => {
    try {
        const { usuario } = req;

        const token = await jwt.sign(
            {
                // @ts-ignore
                id: usuario.id,
                nome: usuario.nome,
            },
            // @ts-ignore
            secret,
            {
                // expiresIn: "24h"
                expiresIn: "24d"
            }
        );

        // @ts-ignore
        const { senha: usuarioSenha, ...outrasInfosUsuario } = usuario;

        return res.status( 200 ).json( {
            usuario: outrasInfosUsuario,
            token
        } );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    login
};
