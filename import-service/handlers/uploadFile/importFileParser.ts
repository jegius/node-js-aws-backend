import * as AWS from "aws-sdk";
import {buildResponse, ErrorCode} from "../common/helpers";
import * as csvParser from "csv-parser";

export const importFileParserHandler: any = async ({Records}) => {
    const {Bucket} = process.env;
    const s3Instance = new AWS.S3({region: 'us-east-1'});

    Records.forEach(record => {
        const Key = record.s3.object.key;
        const s3Stream = s3Instance.getObject({
            Bucket,
            Key
        }).createReadStream();

        s3Stream
            .pipe(csvParser())
            .on('data', data => console.log(data))
            .on('end', async () => {
                console.log(`Copy from ${Bucket}/${Key}`)

                const targetKey = Key.replace('uploaded', 'parsed');
                await s3Instance.copyObject({
                    Bucket,
                    CopySource: `${Bucket}/${Key}`,
                    Key: targetKey
                }).promise();

                console.log(`Copied into ${Bucket}/${targetKey}`)
            })
    })
    try {
        return buildResponse(null);
    } catch (error) {
        console.error(error);
        return buildResponse(error.message, ErrorCode.BAD_REQUEST)
    }
}
