require('dotenv').config({path: '../Clevo-Docker-Compose-Aliyun/.env'})

var OSS = require('ali-oss').Wrapper

var client = new OSS({
  region: process.env[`${process.env.STAGE}_REGION`],
  bucket: process.env[`${process.env.STAGE}_BUCKET`],
  accessKeyId: process.env[`${process.env.STAGE}_ACCESS_KEY_ID`],
  accessKeySecret: process.env[`${process.env.STAGE}_ACCESS_KEY_SECRET`]
})

// console.log(process.env[`${process.env.STAGE}_REGION`])

module.exports = client
