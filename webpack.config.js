var path = require('path');
module.exports = {
    //context slouží pro definici root adresaře se zdrojáky
    context: path.join(__dirname, 'src'),
    entry: {
        //lib: './lib/main.js',
        chapter1: './example/chapter1.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            }
        ]
    }
};