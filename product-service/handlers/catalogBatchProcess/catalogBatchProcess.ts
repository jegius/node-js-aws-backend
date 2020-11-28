import * as SNS from "aws-sdk/clients/sns";
import {SQSHandler} from "aws-lambda";
import {Product} from "../../dao/daoAPI";
import {productDao} from "../../dao/product/productDao";

export const catalogBatchProcessHandler: SQSHandler = async ({Records}) => {
    const products = Records.map(({body}) => JSON.parse(body) as Product);
    const result = products.map(async product => productDao.add(product));

    const response = await Promise.all(result);

    console.log('All products was added into dao:', response)

    const sns = new SNS();
    sns.publish({
        Subject: 'Parsed new Objects',
        Message: JSON.stringify(products),
        TopicArn: process.env.SNS_ARN
    }, () => console.log('Products sent', products))
};