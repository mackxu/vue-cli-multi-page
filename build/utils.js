var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');
var fs = require('fs');
var copyStat = fs.stat;
var htmlEntries = './src/' + config.moduleName + '/**/**/*.html';
var entries = './src/' + config.moduleName + '/**/**/*.js';


exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options) {
    options = options || {};

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var output = [];
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
};

// 所有vue的入口文件 比如main.js
exports.getAllEntries = function () {
    return this.getMultiEntry(entries)
};

// 获取多级的入口文件
exports.getMultiEntry = function (globPath) {
    var entries = {};
    glob.sync(globPath).forEach(function (entry) {
        var paths = path.dirname(entry).split('/');
        paths.splice(0, 2);
        console.log(paths);
        if (paths.length !== 3) {                // 只支持二级目录
            console.log('Error path: ' + entry);
            return false;
        }
        var pathname = paths.join('/');
        entries[pathname] = entry;
    });
    return entries;
};

// HtmlWebpackPlugin需要的配置
exports.buildHtmlPluginConf = function () {
    var pages = this.getMultiEntry(htmlEntries);
    var isProd = process.env.NODE_ENV === 'production';
    return Object.keys(pages).map(function (pathname) {
        var conf = {
            filename: pathname + '.html',
            template: pages[pathname],                  // 模板路径
            chunks: [pathname, 'vendors', 'manifest'],  // 每个html引用的js模块
            inject: true                                // js插入位置
        };
        if (isProd) {
            Object.assign(conf, {
                chunks: ['vendor', pathname],
                hash: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
            })
        }
        return conf;
    })
};

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var filecopy = function (src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            copyStat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exports.startCopy(_src, _dst);
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
exports.startCopy = function (src, dst) {
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            filecopy(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function () {
                filecopy(src, dst);
            });
        }
    });
};


