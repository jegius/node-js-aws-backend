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
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        region: 'eu-west-1',
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
    },
    functions: {
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
                        method: 'put',
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
