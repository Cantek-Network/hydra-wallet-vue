const { default: axios } = require('axios')
const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// allow cors from "*"
app.use(
  cors({
    origin: '*' // allow all
  })
)

// use proxy middleware
app.use(
  '/',
  createProxyMiddleware({
    target: 'http://103.149.170.54:8090',
    changeOrigin: true
  })
)
app.listen(3002, () => {
  console.log('Proxy listening on port 3002')
})
