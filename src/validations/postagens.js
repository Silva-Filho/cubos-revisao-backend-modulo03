const { yup } = require( "../configs/Yup" );

const schemaCadastroOuAtualizacaoPostagem = yup.object().shape( {
    texto: yup.string().strict().required(),
} );

module.exports = {
    schemaCadastroOuAtualizacaoPostagem,
};
