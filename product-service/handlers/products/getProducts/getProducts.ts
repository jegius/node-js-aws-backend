import 'source-map-support/register';
import {buildResponse} from "../../common/helpers";
import {getProducts} from "../../../store/store";
import {APIGatewayProxyHandler} from "aws-lambda";

export const getAvailableProductsHandler: APIGatewayProxyHandler = async () => buildResponse(await getProducts())
