import {S3} from 'aws-sdk';
import {S3Handler} from "aws-lambda";
import * as csv from 'csv-parser';
import 'source-map-support/register';

export const importFileParserHandler: S3Handler = async ({Records}) => {
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
            .on('data', data => console.log(data))
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
}
