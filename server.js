const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const server = express()
const template = require('fs').readFileSync('./public/index.html', 'utf-8')
const isProd = process.env.NODE_ENV === 'production'

function createRenderer(bundle, options){
  return createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false,
    template,
  }))
}

let renderer, readyPromise
if(isProd){
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(serverBundle, {
    clientManifest,
  })
}else{
  readyPromise = require('./build/setup-dev-server.js')(server, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })

  const { createProxyMiddleware } = require('http-proxy-middleware')
  const options = {
    target: 'https://zxctb.top',
    changeOrigin: true,
    ws: true,
  }
  server.use(createProxyMiddleware('/restful', options))
}

server.use('/dist', express.static(__dirname + '/dist'))

server.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: '知行'
  }

  renderer.renderToString(context, (err, html) => {
    if(err){
      if(err.code === 404){
        res.status(404).end('Page not found')
      }else{
        res.status(500).end('Internal Server Error')
      }
    }else{
      res.end(html)
    }
  })
})

server.listen(3090)
