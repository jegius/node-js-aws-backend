import {Serverless} from "serverless/plugins/aws/provider/awsProvider";

const serverlessConfiguration: Serverless = {
    service: {
        name: 'product-service',
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
                Effect: 'Allow',
                Action: [
                    'sqs:ReceiveMessage'
                ],
                Resource: [
                    {
                        'Fn::GetAtt': [ 'SQSQueue', 'Arn' ]
                    }
                ]
            },
            {
                Effect: "Allow",
                Action: "sns:*",
                Resource: {
                    Ref: 'SNSTopic'
                }
            }
        ],
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        region: 'eu-west-1',
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            host: 'shop.cgelecue0dq7.eu-west-1.rds.amazonaws.com',
            port: 5432,
            database: 'shop',
            user: 'postgres',
            password: 'zOMgOkkNpswxYGAuRAv3',
            SNS_ARN: {
                Ref: 'SNSTopic'
            }
        },
    },
    resources: {
        Resources: {
            SQSQueue: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    QueueName: 'catalogItemsQueueSecond',
                },
            },
            SNSTopic: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: 'createProductTopicSecond'
                }
            },
            SNSSubscription: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'jegius@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    }
                }
            },
            SNSSubscriptionBackup: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'jegius@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    },
                    FilterPolicy: {
                        "topTier": ["Mighty"]
                    }
                }
            }
        },
        Outputs: {
            SQSQueueUrl: {
                Value: {
                    Ref: 'SQSQueue'
                }
            },
            SQSQueueArn: {
                Value: {
                    'Fn::GetAtt': ['SQSQueue', 'Arn']
                }
            }
        }
    },

    functions: {
        catalogBatchProcess: {
            handler: 'handler.catalogBatchProcess',
            events: [
                {
                    sqs: {
                        batchSize: 5,
                        arn: {
                            'Fn::GetAtt': ['SQSQueue', 'Arn']
                        }
                    }
                }
            ]
        },
        getAvailableProducts: {
            handler: 'handler.getAvailableProducts',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products/available',
                        cors: true,
                    }
                }
            ]
        },
        addProduct: {
            handler: 'handler.addProduct',
            events: [
                {
                    http: {
                        method: 'post',
                        path: 'products/available',
                        cors: true,
                    }
                }
            ]
        },
        getAvailableProductById: {
            handler: 'handler.getAvailableProductById',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products/available/{id}',
                        cors: true
                    }
                }
            ]
        }
    }
}

module.exports = serverlessConfiguration;
