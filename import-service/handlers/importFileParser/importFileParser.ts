import {S3} from 'aws-sdk';
import * as csv from 'csv-parser';
import 'source-map-support/register';
import * as SQS from "aws-sdk/clients/sqs";

export const importFileParserHandler: any = async ({Records}, _, callback) => {
    const {Bucket} = process.env;
    const s3Instance = new S3({region: 'eu-west-1'});

    Records.forEach(record => {
        const Key = record.s3.object.key;
        const s3Stream = s3Instance.getObject({
            Bucket,
            Key
        }).createReadStream();

        s3Stream
            .pipe(csv())
            .on('data', data => {
                const sqs = new SQS();
                sqs.sendMessage({
                    QueueUrl: process.env.SQL_URL,
                    MessageBody: data
                }, () => console.log('Product sent', data))
            })
            .on('end', async () => {
                console.log(`Copy from ${Bucket}/${Key}`)

                const targetKey = Key.replace('uploaded', 'parsed');
                await s3Instance
                    .copyObject({
                        Bucket,
                        CopySource: `${Bucket}/${Key}`,
                        Key: targetKey
                    }).promise();

                console.log(`Copied into ${Bucket}/${targetKey}`);

                await s3Instance
                    .deleteObject({
                        Bucket,
                        Key
                    })
                    .promise();

            })
    })

    callback(null, {
        statusCode: 202,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
}
