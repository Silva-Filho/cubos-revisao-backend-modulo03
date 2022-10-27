require( "dotenv" ).config();
const jwt = require( "jsonwebtoken" );

const conexao = require( "../database/conexao" );

const secret = process.env.SECRET;

const verificaToken = async ( req, res, next ) => {
    try {
        const { authorization } = req.headers;

        if ( !authorization ) {
            return res.status( 404 ).json( "Token não informado." );
        }

        const token = authorization.replace( "Bearer", "" ).trim();

        // @ts-ignore
        const { id } = jwt.verify( token, secret );

        const queryBuscarUsuario = "SELECT * FROM usuarios WHERE id = $1";
        const { rowCount, rows } = await conexao.query( queryBuscarUsuario, [ id ] );

        if ( rowCount === 0 ) {
            return res.status( 404 ).json( "Usuário não encontrado." );
        }

        const usuario = rows[ 0 ];
        // @ts-ignore
        const { senha: userPwd, ...othersInfosUser } = usuario;

        req.usuario = othersInfosUser;

        next();
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    verificaToken,
};
