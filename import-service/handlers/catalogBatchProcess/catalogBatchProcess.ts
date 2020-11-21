import * as SNS from "aws-sdk/clients/sns";

export const catalogBatchProcessHandler: any = async ({Records}) => {
    const products = Records.map(({body}) => body);
    const sns = new SNS();
    sns.publish({
        Subject: 'Parsed new Objects',
        Message: JSON.stringify(products),
        TopicArn: process.env.SNS_ARN
    }, () => console.log('Products sent', products))
};