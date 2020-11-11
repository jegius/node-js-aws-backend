import 'source-map-support/register';
import {buildResponse, ErrorCode} from "../../common/helpers";
import {APIGatewayProxyHandler} from "aws-lambda";
import {productDao} from "../../../dao/product/productDao";

export const getAvailableProductsHandler: APIGatewayProxyHandler = async () => {
    try {
        return buildResponse(await productDao.getAll())
    } catch (error) {
        buildResponse(error.message, ErrorCode.INTERNAL_SERVER_ERROR)
    }
}
