require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secrectAccessKey = process.env.AWS_SECRECT_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secrectAccessKey
})

// Subir un Archivo a s3
function upload(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        body: fileStream,
        key: file.fileName
    }
}




// Bajar un Archivo de s3