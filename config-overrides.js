const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src', //qual pasta estou colocando a maioria do meu código --> agora o "~" = "src"
    },
  ])
);