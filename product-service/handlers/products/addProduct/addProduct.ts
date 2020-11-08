import 'source-map-support/register';
import {buildResponse, ErrorCode} from "../../common/helpers";
import {APIGatewayProxyHandler} from "aws-lambda";
import {productDao} from "../../../dao/product/productDao";
import {emptyProduct, Product} from "../../../dao/daoAPI";
import {ProductNotFound} from "../../../errors/errors";

export const addProductHandler: APIGatewayProxyHandler = async ({body}) => {
    try {
        const requestData: Product = JSON.parse(body) as Product;
        const [result] = await productDao.add({...emptyProduct, ...requestData}) as Product[]
        return buildResponse(result);
    } catch (error) {
        return error instanceof ProductNotFound
            ? buildResponse(error.message, ErrorCode.BAD_REQUEST)
            : buildResponse(error.message, ErrorCode.INTERNAL_SERVER_ERROR)
    }
}
