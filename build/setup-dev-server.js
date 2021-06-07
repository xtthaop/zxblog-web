const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try{
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  }catch(e){}
}

module.exports = function setupDevServer(app, cb){
  let bundle, clientManifest
  let resolve

  const readyPromise = new Promise(r => { resolve = r })

  const ready = (...args) => {
    resolve()
    cb(...args)
  }

  // modify client config to work with hot middleware
  clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    // serverSideRender: true,
  })

  app.use(devMiddleware)

  clientCompiler.hooks.done.tap('done', stats => {
    stats = stats.toJson()

    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(err => console.log(err))

    if(stats.errors.length) return

    clientManifest = JSON.parse(readFile(devMiddleware.context.outputFileSystem, 'vue-ssr-client-manifest.json'))
    
    if(bundle){
      ready(bundle, { clientManifest })
    }
  })

  // hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()

  // watch and update server renderer
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if(err) throw err

    stats = stats.toJson()

    if(stats.errors.length) return
    
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))

    if(clientManifest){
      ready(bundle, { clientManifest })
    }
  })

  return readyPromise
}
