import {basicAuthorizerHandler} from "./handlers/basicAuthorizer/basicAuthorizer";
import {APIGatewayProxyHandler} from "aws-lambda";

export const basicAuthorizer: APIGatewayProxyHandler = basicAuthorizerHandler;