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
                Action: "s3:ListBucket",
                Resource: "arn:aws:s3:::node-aws-import-service"
            },
            {
                Effect: "Allow",
                Action: "s3:*",
                Resource: "arn:aws:s3:::node-aws-import-service/*"
            }
        ],
        region: 'eu-west-1',
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            Bucket: 'node-aws-import-service',
            Prefix: 'uploaded/',
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
                                suffix: '.csv'
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
