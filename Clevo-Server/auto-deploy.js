const childProcess = require('child_process')
const ossClient = require('../ossClient')
var npmBundle = require('npm-bundle')

console.log(`Stage:${process.env.STAGE} - Clevo-Server`)
console.log('auto-deploy start...')

// Create tarball
console.log('------ Creating tarball file ------')
let fileName = 'clevo-server-1.0.0.tgz'
// child_process.execSync(`npm-bundle ${fileName}`)
var args = []
var options = {
  verbose: true
}
npmBundle(args, options, function onNpmBundle (error, output) {
  if (error) {
    throw error
  }
  process.stdout.write(output.file)
  console.log('------ Success ------')
})

// Upload tarball to OSS
console.log('------ Uploading tar file to OSS ------')
let filePath = `./${fileName}`
ossClient.put(fileName, filePath)
  .then(result => {
    if (result.res.statusCode === 200) {
      console.log('------ Success ------')
      return result.url
    } else {
      throw new Error('tar file is not uploaded successfully')
    }
  })
  // Redeploy container
  .then(url => {
    console.log('------ Redeploying cluster ------')
    let certDir = `~/.docker/aliyun/${process.env.STAGE}_cluster`
    let clusterUrl = process.env[`${process.env.STAGE}_DOCKER_CLUSTER_URL`]
    let projectName = process.env[`${process.env.STAGE}_PROJECT_NAME`]

    // console.log('curl command', `curl --insecure --cert ${certDir}/cert.pem --key ${certDir}/key.pem -X POST ${clusterUrl}/projects/${projectName}/redeploy`)
    try {
        // Todo: use node request / fetch to make the rest call
      childProcess.execSync(`curl --insecure --cert ${certDir}/cert.pem --key ${certDir}/key.pem -X POST ${clusterUrl}/projects/${projectName}/redeploy`)
      console.log('------ Success ------')
    } catch (err) {
      console.log('Redeploy cluster Error', err)
    }
  })
