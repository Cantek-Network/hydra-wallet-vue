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
/**
 *
 * @param {import('express').Request} req
 * @param {*} res
 * @param {*} next
 */
function handler(req, res, next) {
  console.log(req.path)
  next()
}

const PORT = process.env.PORT || 3002

// use proxy middleware
app.use(
  '/',
  handler,
  createProxyMiddleware({
    target: process.env.CARDANO_NODE_PROXY_URL || 'https://cardano-wallet-8090.hydrawallet.net',
    changeOrigin: true,
    logger: console
  })
)
app.listen(PORT, () => {
  console.log('Proxy listening on port:', PORT, ', target: ', process.env.CARDANO_NODE_PROXY_URL)
})
