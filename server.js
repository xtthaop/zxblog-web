const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const server = express()

const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

server.use('/dist', express.static(__dirname + '/dist'))

server.get('*', (req, res) => {
  const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  })

  const context = { url: req.url }

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
