import {Serverless} from "serverless/plugins/aws/provider/awsProvider";

const serverlessConfiguration: Serverless = {
    service: {
        name: 'authorization-service',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    plugins: [
        'serverless-webpack',
        'serverless-dotenv-plugin'
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
        basicAuthorizer: {
            handler: 'handler.basicAuthorizer',
        }
    }
}

module.exports = serverlessConfiguration;
