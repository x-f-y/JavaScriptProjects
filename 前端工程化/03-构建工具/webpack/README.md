## webpack基础应用篇

### webpack打包构建常用命令

- npm install webpack --save-dev
- npx webpack --help
- npx webpack --version(-v)
- npx webpack 使用webpack对项目进行打包
- npx webpack --stats detailed 使用webpack进行打包，并输出详细的打包信息
- npx webpack --entry ./src/index.js --mode production 配置打包的入口和模式
- npx webpack --config(-c) ./config/webpack.config.dev.js 自定义打包的配置文件
- npx webpack --watch 实时侦测文件的变化，每次修改文件后，代码将被重新编译，不需要再使用npx webpack命令手动运行整个构建（但还需要手动刷新浏览器）
- npx webpack --env production --env goal=local 使用webpack进行打包，并传递2个环境变量production和goal，其中production的值为true，goal的值为local（备注：在webpack.config.js文件中，将module.exports设置为返回配置对象的函数，该函数可以接收到传递的环境变量）
- npx webpack-dev-server 或者 npx webpack serve 启动webpack-dev-server服务
- npx webpack-dev-server --open 启动webpack-dev-server服务并打开浏览器

### webpack打包构建常用工具

npm install webpack-cli webpack-dev-serve webpack-merge --save-dev

- webpack-cli：可以在命令行中执行webpack命令
- webpack-dev-server：提供一个基本的web server，并且具有live reloading（实时重新加载）功能（类似于vscode插件：live server）
    备注：webpack-dev-server在编译之后不会写入到任何输出文件。而是将bundle文件保留在内存中（打包后的bundle文件不会发生变化）
- webpack-merge：合并webpack配置对象

### 资源模块（webpack 5）

> 在webpack 5之前，通常使用：
>
> 1. raw-loader：将文件导入为字符串
> 2. url-loader：将文件作为 Data URI 内联到 bundle 中
> 3. file-loader：将文件发送到输出目录

- resource资源类型
    `type: 'asset/resource'` **发送一个单独的文件并导出资源的URL**
- inline资源类型
    `type: 'asset/inline'` **导出一个资源的Data URI（base64格式）**
- source资源类型
    `type: 'asset/source'` **导出资源的源代码**
- 通用资源类型
    `type: 'asset'` **在导出一个Data URI和发送一个单独的文件之间自动选择**
    备注：webpack将按照默认条件，自动的在`asset/resource`和`asset/inline`之间进行选择：小于8KB的文件，将会视为`asset/inline`模块类型，否则会被视为`asset/resource`模块类型。可以通过在webpack配置的`module.rules`层级中，设置`Rule.parser.dataUrlCondition.maxSize`选项来修改此条件
- 代码示例
    ```js
    module.exports = {
        output: {
          assetModuleFilename: 'images/[contenthash][ext]', // 配置导出资源模块的文件名 方式一
        },
        module: {
            rules: [
                {
                    test: /\.png$/, // 处理.png文件
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[contenthash][ext]', // 配置导出资源模块的文件名 方式二
                    },
                },
                {
                    test: /\.svg$/, // 处理.svg文件
                    type: 'asset/inline',
                },
                {
                    test: /\.txt$/, // 处理.txt文件
                    type: 'asset/source',
                },
                {
                    test: /\.jpg$/, // 处理.jpg文件
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 * 1024, // 4MB
                        },
                    },
                },
            ]
        }
    }
    // 备注1：若方式二存在，则导出资源模块的文件名为使用方式二所配置的文件名；若方式二不存在，则导出资源模块的文件名为使用方式一所配置的文件名
    // 备注2：[contenthash]为根据文件内容生成的hash字符串，[ext]为原资源的扩展名
    ```

### plugin

npm install html-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin --save-dev

- html-webpack-plugin 自动创建html文件
- mini-css-extract-plugin 将css代码提取到单独的文件中，在html文件中使用link标签的方式引入
- css-minimizer-webpack-plugin 优化和压缩css代码
- terser-webpack-plugin 压缩js代码

### loader

webpack只能理解js和json这样的文件，这是webpack开箱可用的自带的能力，loader可以让webpack去解析其它类型的文件，并且将这些文件转化为有效的模块，以供我们的应用程序使用

style-loader 将css代码通过style标签的方式插入到DOM中
css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
less-loader 加载并编译 LESS 文件
csv-loader 解析csv和tsv文件
xml-loader 解析xml文件
babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
@babel/core babel核心模块
@babel/preset-env babel预设，一组babel插件的集合
ts-loader 像加载 JavaScript 一样加载 TypeScript 2.0+

- 加载css文件和less文件
    npm install css-loader style-loader --save-dev
    npm install less-loader less --save-dev
    代码示例：
    
    ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
    module.exports = {
        mode: 'production', // 使用CssMinimizerWebpackPlugin插件压缩css代码时，需要将mode设置为生产环境
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    // use: ['style-loader', 'css-loader', 'less-loader'], // 注意：loader支持链式加载，且加载顺序是从后往前的
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ],
        optimization: {
            minimizer: [
                new CssMinimizerWebpackPlugin(),
            ],
        },
    }
    ```
- 加载数据
    npm install csv-loader xml-loader --save-dev
    代码示例：
    
    ```js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.(csv|tsv)$/,
                    use: 'csv-loader',
                },
                {
                    test: /\.xml$/,
                    use: 'xml-loader',
                },
            ]
        }
    }
    ```
- 加载字体文件
    代码示例：
    
    ```js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体文件
                    type: 'asset/resource',
                },
            ]
        }
    }
    ```
- 加载toml文件、yaml文件和json5文件
    npm install toml yaml json5 --save-dev
    代码示例：
    
    ```js
    const toml = require('toml')
    const yaml = require('yaml')
    const json5 = require('json5')
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.toml$/,
                    type: 'json',
                    parser: {
                        parse: toml.parse,
                    },
                },
                {
                    test: /\.yaml$/,
                    type: 'json',
                    parser: {
                        parse: yaml.parse,
                    },
                },
                {
                    test: /\.json5$/,
                    type: 'json',
                    parser: {
                        parse: json5.parse,
                    },
                },
            ]
        }
    }
    ```
- 将ES6+语法编译成低版本浏览器能识别的ES5语法
    npm install babel-loader @babel/core @babel/preset-env --save-dev
    代码示例：
    
    ```js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // 排除node_modules文件夹中的js文件
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ]
        }
    }
    ```
- 加载typescript文件
    npm install typescript ts-loader --save-dev
    代码示例：

    ```js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        }
    }
    ```

### webpack.config.js代码示例

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js', // 打包入口
    output: { // 打包出口
        filename: 'bundle.js', // 指定输出文件的文件名
        path: path.resolve(__dirname, './dist'), // 文件的输出路径（必须是绝对路径）
        clean: true, // 打包之前清理dist文件夹
    },
    // mode: 'none', // 模式
    // mode: 'production', // 生产环境
    mode: 'development', // 开发环境
    devtool: 'inline-source-map', // 可以在浏览器控制台准确查看错误代码的位置，方便调试
    plugins: [ // 插件
        new HtmlWebpackPlugin({
            template: './index.html', // 将我们写的html文件（03-manage-output/index.html）作为模板创建新的html文件
            filename: 'app.html', // 自定义生成的html文件的文件名
            inject: 'body', // 将生成的script标签插入到body标签的末尾
        }),
    ],
    devServer: {
        static: './dist', // 配置server服务的根目录
        open: true, // 自动打开浏览器
        client: {
            overlay: false, // 当出现编译错误或警告时，在浏览器中不显示全屏覆盖的遮罩层
        },
    },
    module: { // 配置如何处理模块
        rules: [], // 配置模块的读取和解析规则
    },
}
```

### 代码分离

> chunk：webpack打包过程中，一堆module的集合。我们知道webpack的打包是从一个入口文件（也可以说是入口模块）开始，入口模块引用其他模块，模块再引用模块。webpack通过这种引用关系逐个打包模块，这些module就形成了一个chunk。如果我们有多个入口文件，就可能会形成多条打包路径，一条路径就会形成一个chunk

1. 配置入口起点
    做法：使用entry配置手动地分离代码
    缺点：多个入口共享的文件会分别在各自的bundle.js文件中重复打包
    代码示例：
    
    ```js
    module.exports = {
        entry: {
            index: './src/index.js',
            another: './src/another-module.js'
        },
        output: {
            filename: '[name].bundle.js' // [name]为chunk入口文件的名称，这里是index和another
        }
    }
    ```
2. 入口依赖
    做法：配置dependOn选项，这样可以在多个chunk之间共享模块
    代码示例：
    
    ```js
    module.exports = {
        entry: {
            index: {
                import: './src/index.js',
                dependOn: 'shared'
            },
            another: {
                import: './src/another-module.js',
                dependOn: 'shared'
            },
            shared: 'lodash'
        },
        output: {
            filename: '[name].bundle.js'
        }
    }
    ```
3. 使用webpack内置的SplitChunksPlugin进行代码分离
    代码示例：
    
    ```js
    module.exports = {
        entry: {
            index: './src/index.js',
            another: './src/another-module.js'
        },
        output: {
            filename: '[name].bundle.js'
        },
        optimization: {
            splitChunks: {
                chunks: "all"
            }
        }
    }
    ```
4. 动态导入
    做法：通过模块的内联函数import调用来分离代码
    代码示例：
    
    ```js
    function getComponent(){
        return import('lodash').then(({default: _}) => {
            const element = document.createElement('div')
            div.textContent = _.join(['hello', 'webpack'], ' ')
            return element
        })
    }
    getComponent().then(element => {
        document.body.appendChild(element)
    })
    ```

### 动态导入的应用

1. 懒加载

> 懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载

代码示例：
```js
button.addEventListener('click', () => {
    import(/* webpackChunkName: 'math' */'./math.js').then(({add, minus}) => {
        console.log(add(4, 5))
        console.log(minus(7, 1))
    })
})
// webpackChunkName: 'math'是一句魔法注释，用来告诉webpack打包生成的文件名为math.bundle.js，因为在webpack.config.js中有这样一句配置：output: { filename: '[name].bundle.js' }
```

2. 预获取/预加载模块

> 在声明import时，使用下面这些内置指令，可以让webpack输出“resource hint”的资源提示，来告知浏览器：
    - prefetch(预获取)：将来某些导航下可能需要的资源
    - preload(预加载)：当前导航下可能需要的资源

prefetch和preload的区别：
- preload chunk会在父chunk加载时以并行方式开始加载。而prefetch chunk会在父chunk加载结束后开始加载
- preload chunk具有中等优先级，并会立即下载。而prefetch chunk则是在浏览器闲置时下载
- preload chunk会在父chunk中立即请求，用于当下时刻。而prefetch chunk则用于未来的某个时刻
- 浏览器支持程度不同

代码示例：
```js
button.addEventListener('click', () => {
    import(/* webpackPrefetch: true, webpackPreload: true */'./math.js').then(({add, minus}) => {
        console.log(add(4, 5))
        console.log(minus(7, 1))
    })
})
```

> 懒加载和预加载的区别：预加载是指在页面加载完成之前，提前将所需资源下载，之后使用的时候从缓存中调用；懒加载是延迟加载，按照一定的条件或者需求等到满足条件的时候再加载对应的资源

### 缓存

代码示例：
```js
module.exports = {
    output: {
        // [contenthash]是根据资源内容创建出的唯一hash，当资源内容发生变化时，[contenthash]也会发生变化
        // 以确保文件内容发生变化后，客户端不使用缓存中的文件，而去请求新的文件
        filename: 'scripts/[name].[contenthash].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 第三方库不会像本地的源代码那样被频繁修改，所以将其提取到单独的vendor chunk文件中，是比较推荐的做法
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}
```

### 拆分开发环境和生产环境配置

```js
// config/webpack.config.dev.js
module.exports = {
    output: {
        filename: 'scripts/[name].js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    }
}
```

```js
// config/webpack.config.prod.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    output: {
        filename: "scripts/[name].[contenthash].js",
        publicPath: "http://localhost:8080/" // 指定在浏览器中访问打包后的资源时的公共路径
    },
    mode: 'production',
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    performance: {
        hints: false // 关闭性能提示，webpack不会在控制台输出性能提示信息
    }
}
// 备注：output.publicPath为资源(assets)被引用的根路径，该配置会为index.html中引入的<script>、<link>等标签中的资源路径添加前缀
```

```js
// config/webpack.config.common.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const yaml = require('yaml')
const toml = require('toml')
const json5 = require('json5')
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        assetModuleFilename: "images/[contenthash][ext]"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "app.html",
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.png$/,
                type: "asset/resource",
                generator: {
                    filename: 'images/[contenthash][ext]'
                }
            },
            {
                test: /\.svg$/,
                type: "asset/inline"
            },
            {
                test: /\.txt$/,
                type: "asset/source"
            },
            {
                test: /\.jpg$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 * 1024
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource"
            },
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            },
            {
                test: /\.toml$/,
                type: "json",
                parser: {
                    parse: toml.parse
                }
            },
            {
                test: /\.yaml$/,
                type: "json",
                parser: {
                    parse: yaml.parse
                }
            },
            {
                test: /\.json5$/,
                type: "json",
                parser: {
                    parse: json5.parse
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all"
                }
            }
        }
    }
}
```

```js
// config/webpack.config.js
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const developmentConfig = require('./webpack.config.dev')
const productionConfig = require('./webpack.config.prod')
module.exports = (env) => {
    switch(true){
        case env.development:
            return merge(commonConfig, developmentConfig)
        case env.production:
            return merge(commonConfig, productionConfig)
        default:
            throw new Error('no matching configuration was found!')
    }
}
```

```json
// package.json
// 如果没有全局安装webpack（实际上，也不建议全局安装webpack），那么就需要使用npx webpack来运行项目内部安装的webpack
// 而在package.json文件的scripts部分中，不需要使用npx，这是因为npm会首先在项目内部的node_modules文件夹中查找命令，如果找到了，就会直接运行
{
    "scripts": {
        "start": "webpack serve -c ./config/webpack.config.js --env development",
        "build": "webpack -c ./config/webpack.config.js --env production"
    }
}
```

## webpack高级应用篇

### Source Map

Source Map举例：

|模式|解释|
|:----:|:----:|
|eval|每个module会封装到eval里包裹起来执行，并且会在末尾追加注释//# sourceURL=...|
|source-map|生成一个SourceMap文件，并在bundle末尾追加注释//# sourceMappingURL=...|
|hidden-source-map|和source-map一样，也会生成一个SourceMap文件，但不会在bundle末尾追加注释|
|inline-source-map|不生成SourceMap文件，以base64格式的Data URL注释在bundle文件的末尾|
|eval-source-map|和eval类似，但是把注释里的SourceMap都转为了DataURL|
|cheap-source-map|生成一个没有列信息的SourceMap文件，不包含loader的SourceMap|
|cheap-module-source-map|生成一个没有列信息的SourceMap文件，同时loader的SourceMap也被简化为只包含对应行的|
|......|......|

> 备注：开发环境推荐使用eval-cheap-module-source-map，生产环境一般不会开启source-map（省略devtool选项）

### devServer

```js
module.exports = {
    devServer: {
        static: './dist',
        compress: true, // 启用gzip压缩，建议使用，可以减少服务器向前端传输的数据量，提高浏览的速度
        port: 3000, // 指定监听请求的端口号
        headers: { // 为所有响应添加响应头
            "X-Access-Token": 'abc123'
        },
        proxy: { // 开启代理服务器
            '/api': "http://localhost:9000" // 将以/api开头的请求转发给http://localhost:9000
        },
        // https: true, // 默认情况下，开发服务器将通过 HTTP 提供服务，可以选择使用 HTTPS 提供服务
        http2: true, // 启用HTTP/2协议（HTTP/2默认自带https自签名证书）
        historyApiFallback: true,
        host: '0.0.0.0', // 如果你想要让和你处在同一局域网下的的同事通过局域网ip访问你的服务，可以这样设置
        devMiddleware: {
            writeToDisk: true // 使用npx webpack sever启动服务时，将文件写入到磁盘中（打包后的bundle文件会发生变化）
        }
    }
}
// 备注：如果我们的应用是单页面应用（SPA），通常会使用路由（例如：vue-router）来进行页面的跳转，在history模式下，刷新页面，会报404错误，将historyApiFallback设置为true可以解决这个问题
```

### 模块热替换与热加载

- 模块热替换（HMR，hot module replacement）：在应用程序运行过程中，替换、添加或删除模块时，会在不刷新整个页面的情况下，通过用新模块替换老模块来做到实时预览
- 模块热加载：当监听到文件变化时 dev-server 将会重新加载并刷新页面

```js
module.exports = {
    devServer: {
        hot: true, // 默认值，开启模块热替换
        liveReload: true // 默认值，开启模块热加载
    }
}
```

模块热替换（HMR）加载JS：

```javascript
import './input.js';
if(module.hot){
    module.hot.accept('./input.js', () => {
        console.log('Accepting the updated input module!');
    })
}
```

模块热替换（HMR）加载样式：如果你配置了style-loader，那么现在已经支持样式文件的热替换功能了，因为style-loader内部已经使用了module.hot.accept

### 模块与依赖

#### 模块解析

```js
const path = require('path')
module.exports = {
    resolve: { // 配置模块如何解析
        alias: { // 创建 import 或 require 的别名
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.json', '.js', '.vue'] // 在使用reqire或者import语句进行模块导入时，若不写文件后缀名，则webpack会使用该配置项中的后缀名进行依次匹配
    }
}
// 备注：webpack使用 enhanced-resolve 来解析文件路径（绝对路径、相对路径和模块路径）
```

#### 外部扩展

> externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法，防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)

```js
// app.js
import '$' from 'jquery'
console.log($)
// webpack.config.js
module.exports = {
    // 写法一（需在html文件中使用cdn引入jquery）
    externals: {
        'jquery': 'jQuery'
    },
    // 写法二
    externalsType: 'script', // 告诉webpack如何处理externals配置中指定的外部依赖，值为script表示webpack会将外部依赖作为一个单独的脚本引入到HTML文件中
    externals: {
        'jquery': ["https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js", '$']
    }
    // 写法三
    externals: {
        'jquery': ["script https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js", '$']
    }
}
```

#### 依赖图

每当一个文件依赖另一个文件时，webpack会直接将文件视为存在依赖关系。这使得webpack可以获取非代码资源，如images或web字体等。并会把它们作为依赖提供给应用程序。当webpack开始工作时，它会根据我们写好的配置，从入口（entry）开始，webpack会递归的构建一个依赖关系图，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为bundle（也就是output的配置项），这里以webpack-bundle-analyzer为例：

webpack-bundle-analyzer
1. 描述：一个plugin和CLI工具，它将bundle内容展示为一个便捷的、交互式、可缩放的树状图形式
2. 安装：`npm install webpack-bundle-analyzer -D`
3. 使用：
    ```js
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    module.exports = {
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    }
    ```

### postcss与css模块

postcss 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。比如可以使用 autoprefixer 插件自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮我们自动的为 CSS 规则添加前缀，将最新的 CSS 语法转换成大多数浏览器都能理解的语法

CSS 模块能让你永远不用担心命名太大众化而造成冲突，只要用最有意义的名字就行了

npm i style-loader css-loader postcss-loader autoprefixer postcss-nested -D

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true // 开启css模块
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }
}
// 备注：开启css模块可以将css分不同模块打包，各个模块之间互不干扰（为什么要模块化？因为使用css类可能会出现样式覆盖的问题）
// postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested')
    ]
}
// 备注：autoprefixer可以自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀；postcss-nested可以让我们在书写css代码时能够使用嵌套规则
// package.json
{
    "browserslist":[
        "> 1%",
        "last 2 versions"
    ]
}
// app.js
import style from './style.css'
console.log(style) // {box: 'jiiwoQM4RBXA8T7kGVrB'}
```

### 多页面应用

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        main1: {
            import: ['./src/app1.js', './src/app2.js'],
            dependOn: 'lodash',
            filename: 'channel1/[name].js' // 通常，入口chunk的输出文件名是从output.filename中获取的，但也可以为入口指定一个自定义的输出文件名
        },
        main2: {
            import: './src/app3.js',
            dependOn: 'lodash',
            filename: 'channel2/[name].js'
        },
        lodash: {
            import: 'lodash',
            filename: 'common/[name].js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            myTitle: 'webpack page-1', // 在模板html文件的title标签中输入<%= htmlWebpackPlugin.options.myTitle %>以获取当前设置的标题
            template: './index1.html',
            inject: 'body',
            filename: 'channel1/index1.html',
            chunks: ['main1', 'lodash'], // 指定生成的HTML文档中需要引用的chunk
            publicPath: "http://www.a.com/" // 指定生成的HTML文档中的script标签和link标签中资源路径的前缀
        }),
        new HtmlWebpackPlugin({
            myTitle: 'webpack page-2',
            template: './index2.html',
            inject: 'body',
            filename: 'channel2/index2.html',
            chunks: ['main2', 'lodash'],
            publicPath: "http://www.b.com/"
        })
    ]
}
```

### Tree Shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中哪些文件是没有副作用的，由此可以安全地删除文件中未使用的部分

```js
// webpack.config.js
module.exports = {
    optimization: {
        usedExports: true, // 告知 webpack 打包结果中只导出外部用到的成员
        minimize: true // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 中定义的插件压缩 bundle
    }
}
```
```json
// package.json
{
    "sideEffects": ["*.css", "*.global.js"]
}
// 备注1：以上配置表示告诉webpack，以.css和.global.js结尾的文件有副作用，即使项目中没有使用到这些文件，这些文件也应该打包到bundle中
// 备注2：sideEffects的值也可以是布尔值true或false，表示告诉webpack项目中的所有文件都有（或都没有）副作用
```

### 渐进式网络应用程序

渐进式网络应用程序(progressive web application - PWA)，是一种可以提供类似于 native app(原生应用程序) 体验的 web app(网络应用程序)。PWA 可以用来做很多事。其中最重要的是，在离线(offline)时应用程序能够继续运行功能。这是通过使用名为 Service Workers 的 web 技术来实现的。Service Worker 是一个后台运行的 Worker 线程，充当一个代理服务器，拦截用户发出的网络请求，比如加载脚本和图片。Service Worker 可以修改用户的请求，或者直接向用户发出响应，不用联系服务器，这使得用户可以在离线情况下使用网络应用。它还可以在本地缓存资源文件，直接从缓存加载文件，因此可以加快访问速度

npm install workbox-webpack-plugin --save-dev

```js
// webpack.config.js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
module.exports = {
    entry: './src/index.js'
    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}
// index.js
...
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        // 备注：service-worker.js是运行npx webpack打包生成的文件
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('SW 注册成功: ', registration);
            })
            .catch(registrationError => {
                console.log('SW 注册失败: ', registrationError);
            })
    })
}
// 备注：在chrome浏览器地址栏输入chrome://serviceworker-internals/可以了解当前浏览器中所有已安装Service Worker的详细情况
```

### Shimming 预置依赖

#### Shimming 预置全局变量
```js
// webpack.config.js
const webpack = require('webpack')
module.exports = {
    entry: './src/index.js',
    plugins: [
        new webpack.ProvidePlugin({
            '_': 'lodash' // 告诉webpack：如果遇到了至少一处用到 _ 变量的模块实例，那么就将 lodash package 引入进来，并将其提供给需要用到它的模块
        })
    ]
}
// index.js
console.log(_.join(['hello', 'webpack'], ' ')) // hello webpack
```

#### 细粒度 Shimming

一些遗留模块依赖的 this 指向的是 window 对象，当模块运行在 CommonJS 上下文中，这将会变成一个问题，也就是说此时的 this 指向的是 module.exports。在这种情况下，可以通过使用 imports-loader 覆盖 this 指向

npm install imports-loader --save-dev

```js
// webpack.config.js
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: require.resolve('./src/index.js'),
                use: 'imports-loader?wrapper=window'
            }
        ]
    }
}
// index.js
this.alert('hello webpack')
```

#### 全局 Exports

npm install exports-loader --save-dev
exports-loader 允许对源文件设置 module.exports/exports（当源文件不包含exports或者有一些内容没有exports时是有用的）

```js
// globals.js
const file = 'hello exports-loader'
const helpers = {
    test(){
        console.log('test something')
    },
    parse(){
        console.log('parse something')
    }
}
// webpack.config.js
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse,multiple|helpers.test|test'
            }
        ]
    }
}
// index.js
import { file, parse, test } from './globals'
console.log(file) // hello exports-loader
parse() // parse something
test() // test something
```