import {Serverless} from "serverless/plugins/aws/provider/awsProvider";

const serverlessConfiguration: Serverless = {
    service: {
        name: 'import-service',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    plugins: [
        'serverless-webpack'
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        iamRoleStatements: [
            {
                Effect: "Allow",
                Action: ["s3:uploadToBucket"],
                Resource: "arn:aws:s3:::node-aws-import-service"
            },
            {
                Effect: "Allow",
                Action: ["s3:*"],
                Resource: "arn:aws:s3:::node-aws-import-service/*"
            },
            {
                Effect: "Allow",
                Action: "sqs:*",
                Resource: ['${cf:product-service-${self:provider.stage}.SQSQueueArn}']
            }
        ],
        stage: 'dev',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            Bucket: 'node-aws-import-service',
            Prefix: 'uploaded/',
            SQS_URL: '${cf:product-service-${self:provider.stage}.SQSQueueUrl}',
        },
    },
    functions: {
        importProductsFile: {
            handler: 'handler.importProductsFile',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'import',
                        request: {
                            parameters: {
                                querystrings: {
                                    name: true
                                }
                            }
                        },
                        cors: true,
                    }
                }
            ]
        },
        importFileParser: {
            handler: 'handler.importFileParser',
            events: [
                {
                    s3: {
                        bucket: 'node-aws-import-service',
                        event: 's3:ObjectCreated:*',
                        rules: [
                            {
                                prefix: 'uploaded/',
                                suffix: ''
                            }
                        ],
                        existing: true
                    }
                }
            ]
        }
    }
}

module.exports = serverlessConfiguration;
