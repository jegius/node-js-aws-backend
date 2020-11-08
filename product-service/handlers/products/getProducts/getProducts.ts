import 'source-map-support/register';
import {buildResponse, ErrorCode} from "../../common/helpers";
import {APIGatewayProxyHandler} from "aws-lambda";
import {productDao} from "../../../dao/product/productDao";
import {ProductNotFound} from "../../../errors/errors";

export const getAvailableProductsHandler: APIGatewayProxyHandler = async () => {
    try {
        return buildResponse(await productDao.getAll())
    } catch (error) {
        return error instanceof ProductNotFound
            ? buildResponse(error.message, ErrorCode.BAD_REQUEST)
            : buildResponse(error.message, ErrorCode.INTERNAL_SERVER_ERROR)
    }
}
