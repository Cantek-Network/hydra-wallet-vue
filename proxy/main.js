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

// use proxy middleware
app.use(
  '/',
  handler,
  createProxyMiddleware({
    target: 'https://cardano-wallet-8090.hydrawallet.net',
    changeOrigin: true,
    logger: console
  })
)
app.listen(3002, () => {
  console.log('Proxy listening on port 3002')
})
