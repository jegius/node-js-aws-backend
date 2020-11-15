import * as AWS from "aws-sdk";

export const importProductsFileHandler: any = async ({queryStringParameters: {name}}) => {
    const {Bucket} = process.env;
    const catalogPath = `uploaded/${name}`;
    const s3Instance = new AWS.S3({region: 'us-east-1'});

    return new Promise(((resolve, reject) => {
        s3Instance.getSignedUrl('putObject', {
                Bucket,
                Key: catalogPath,
                Expires: 60,
                ContentType: 'text/csv'
            }, (error, url) => !!error
            ? reject(error)
            : resolve({
                statusCode: 200,
                headers: {'Access-Control-Allow-Origin': '*'},
                body: url
            })
        )
    }))
}