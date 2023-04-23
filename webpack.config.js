const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', 
    devtool: "source-map", 
    entry: {
        // common: './src/common.js',
        compare: [ './src/compare.js'], 
        set:[ './src/set.js'], 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/compare.html',
            filename: 'compare.html',
            chunks: ['compare'],
            // minify: {
            //     collapseWhitespace: true
            // },
            // 在这里配置需要引入的 CSS 文件
            // 通过 chunks 可以指定需要包含的 JS 文件
            // 通过 excludeChunks 可以指定不需要包含的 JS 文件
            // CSS 文件会自动添加 <link> 标签到 HTML 文件中
            // 可以使用 <link href=[filename]> 来引用 CSS 文件
            // 也可以将 CSS 文件的样式插入到 HTML 的 <style> 中
            // 通过 inject 表示插入位置，可以是 'head' 或 'body'
            // 通过 attributes 表示为 <link> 标签添加其他属性（如 media）
            // 也可以通过 meta 表示添加其他 <meta> 标签到 HTML 文件中
            // 更多配置项可以参考官方文档：https://github.com/jantimon/html-webpack-plugin#configuration
            meta: {
                viewport: 'width=device-width, initial-scale=1.0'
            },
            inject: 'head',
            attributes: {
                'meta': 'viewport'
            },
            chunksSortMode: 'auto',
            // 配置需要引入的 CSS 文件
            // 可以是一个数组，也可以是一个字符串
            // 排除掉了 set，因为它会在 set.html 中被引用
            // ('set' 在 compare.html 中没有用到)
            // 此时 CSS 文件会被自动引入到 HTML 文件中
            // 可以使用 <link href="[filename]"> 来引用他们
            // 或者样式可以直接插入到 HTML 的 <style> 中
            // 样式插入的位置通过 inject 来控制
            // 可以是 'head' 或 'body'，默认是 'body'
            // `link` 标签的其他属性可以通过 attributes 来指定
            // 比如 `media`、`rel` 等
            excludeChunks: ['set'],
            files: {
                css: ['src/style1.css', 'src/style2.css']
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/set.html',
            filename: 'set.html',
            chunks: [ 'set'],
            // minify: {
            //     collapseWhitespace: true
            // },
            meta: {
                viewport: 'width=device-width, initial-scale=1.0'
            },
            inject: 'head',
            attributes: {
                'meta': 'viewport'
            },
            chunksSortMode: 'auto',
            excludeChunks: ['compare'],
            // 这里只引入了 'style1.css' 和 'style3.css' 文件
            // 排除掉了 'style2.css'，因为它只用在 compare.html 中
            files: {
                css: ['src/style1.css', 'src/style3.css']
            },
        })
    ]
}