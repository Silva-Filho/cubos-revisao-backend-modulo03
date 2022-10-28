const express = require( "express" );

// Middlewares
const { 
    validarBodyCadastroUsuario, 
    verificarEmail,  
} = require( "./middlewares/usuarios" );
const { 
    validarBodyLogin, 
    validarSenhaUsuario, 
} = require( "./middlewares/login" );
const { verificaToken } = require( "./middlewares/auth" );
const { 
    validarBodyRequisicaoPostagem, 
    verificarPostagemExiste 
} = require( "./middlewares/postagens" );
const { validarIdParams } = require( "./middlewares/idParams" );

// Controllers
const { cadastrar } = require( "./controllers/usuarios" );
const { login } = require( "./controllers/login" );
const {
    registerPost,
    updatePost,
    excluirPostagem,
    listarTodasPostagens,
    listarPostagensUsuario
} = require( "./controllers/postagens" );

const router = express();

// Cadastrar usuário:
router.post( 
    "/usuarios", 
    validarBodyCadastroUsuario, 
    verificarEmail, 
    cadastrar 
);
// Login
router.post( 
    "/login", 
    validarBodyLogin, 
    verificarEmail, 
    validarSenhaUsuario, 
    login 
);
// Listar todas as postagens não precisa estar autenticado:
router.get( "/", listarTodasPostagens );

// Validar token e usuário:
router.use( verificaToken );

//  Postagens
router.post( 
    "/postagens", 
    validarBodyRequisicaoPostagem, 
    registerPost 
);
router.get( 
    "/postagens", 
    listarPostagensUsuario 
);
router.patch( 
    "/postagens/:id", 
    validarIdParams, 
    verificarPostagemExiste, 
    validarBodyRequisicaoPostagem, 
    updatePost 
);
router.delete( 
    "/postagens/:id", 
    validarIdParams, 
    verificarPostagemExiste, 
    excluirPostagem 
);

module.exports = {
    router
};
