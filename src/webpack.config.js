// const WrbpackBundleAnalyzer=require('webpack-bundle-analyzer')
const {BundleAnalyzerPlugin}=require('webpack-bundle-analyzer')
const base=[
        new HTMLWebpackPlugin({
            // title:'webpack title',
            template:'./src/index.html',
            minify:{
                collapseWhiteSpace:isProd
            }
        }),
        new CopyWebpackPlugin([
            from:path.resolve(__dirname,'src/favicon.ico'),
            to:path.resolve(__dirname,'dist')
        ]),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:filename('css')
        }),
    ]
    if(isProd){
        base.push(new WebpackBundleAnalyzer())
    }
const HTMLWebpackPlugin=require('html-webpack-plugin')
const OptimizeCssAssetPlugin=require('optimize-css-asset-plugin')
const TersetWebpackPlugin=require('terser-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const path=require('path')
const isDev=process.env.NODE_ENV === 'development'
const isProd=process.env.NODE_ENV === 'productions'
const jsLoaders=()=>{
    const loaders=[{
        loader:'babel-loader',
        options:babelOptions()
    }]
    if(isDev){
        loaders.push('eslint-loader')
    }
    return loaders 
}
const babelOptions=(preset)=>{
    const opts={
        presets:[
            '@babel/preset-env',

        ],
        plugins:[
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if(preset){
        opts.preset.push(preset)
    }
    return opts
}
const optimization=()=>{
    const config={
        splitChunks:{
                chunks:'all'
        }
    }
    if(isProd){
        config.minimizer=[
            new OptimizeCssAssetPlugin(),
            new TersetWebpackPlugin()
        ]
    }
    return config
}
const filename=ext=>isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const cssLoaders=(extra)=>{
    const loaders=[
        [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr:isDev,
              reloadAll:true
            },
          },'style-loader','css-loader']
            }
    ]
    if(extra){
        loaders.push(extra)
    }
    return loaders
}
module.exports={
    context:path.resolve(__dirname,'src'),
    mode:'development',
    entry:{
        main:['@babel/polyfill','./index'],
        analytics:'./analytics.ts',
    },
    // entry:'./src/index.js',
    output:{
        filename:filename('js'),
        path:path.resolve(__dirname,'dist')
    },
     plugins:plugins()
     //[
    //     new HTMLWebpackPlugin({
    //         // title:'webpack title',
    //         template:'./src/index.html',
    //         minify:{
    //             collapseWhiteSpace:isProd
    //         }
    //     }),
    //     new CopyWebpackPlugin([
    //         from:path.resolve(__dirname,'src/favicon.ico'),
    //         to:path.resolve(__dirname,'dist')
    //     ]),
    //     new CleanWebpackPlugin(),
    //     new MiniCssExtractPlugin({
    //         filename:filename('css')
    //     }),

    // ]
    ,
    module:{
        rules:[
            {
                test:/\.css$/,
                use:cssLoaders(),
            {
                test:/\.s[ac]ss$/,
                 use:cssLoaders('sass-loader')
        [{
        //     loader: MiniCssExtractPlugin.loader,
        //     options: {
        //       hmr:isDev,
        //       reloadAll:true
        //     },
        //   },'sass-loader','css-loader']
            },
            {
                test:/\.png|jpg|svg|gif$/,
                use:['file-loader']
            },
            
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test:/\.xml$/,
                use:['xml-loader']
            },
            {
                test:/\.csv$/,
                use:['csv-loader']
            },
        ],
        
        rules:[
            {
                test:/\.css$/,
                use:cssLoaders('less-loader')
            },
            {
                test:/\.png|jpg|svg|gif$/,
                use:['file-loader']
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test:/\.xml$/,
                use:['xml-loader']
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                // loader:{
                //     loader:'babel-loader',
                //     options:babelOptions()
                // }
                use:jsLoaders()
            },
            {
                test:/\.ts$/,
                exclude:/node_modules/,
                loader:{
                    loader:'babel-loader',
                    options:babelOptions('@babel/preset-typescript')
                }
            },
            {
                test:/\.jsx$/,
                exclude:/node_modules/,
                loader:{
                    loader:'babel-loader',
                    options:babelOptions('@babel/preset-react')
                }
            },
            {
                test:/\.csv$/,
                use:['csv-loader']
            },
        ],
        devtool:isDev ? 'source-map' : '',
        devServer:{
            port:4200,
            hot:isDev
        },
        optimization:optimization()
        },
        resolve:{
            extensions:['.js','.json','.png',],
            alias:{
                '@models':path.resolve(__dirname,'src/models')
            }
        }
    }
}