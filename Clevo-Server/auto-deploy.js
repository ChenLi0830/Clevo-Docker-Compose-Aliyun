const child_process = require('child_process')
const ossClient = require('../ossClient')

console.log(`Stage:${process.env.STAGE} - Clevo-Server`)
console.log('auto-deploy start...')

console.log('------ Creating tarball file ------')
let fileName = 'clevo-server-1.0.0.tgz'
child_process.execSync(`npm-bundle ${fileName}`)
console.log('------ Success ------')

// console.log('------ Uploading tar file to OSS ------')

// console.log('------ Success ------')
