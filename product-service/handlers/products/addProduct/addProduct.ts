import 'source-map-support/register';
import {buildResponse, ErrorCode, isRequestDataValid, positiveOnly} from "../../common/helpers";
import {APIGatewayProxyHandler} from "aws-lambda";
import {productDao} from "../../../dao/product/productDao";
import {emptyProduct, Product} from "../../../dao/daoAPI";
import {InvalidProductData, ProductNotFound} from "../../../errors/errors";

export const addProductHandler: APIGatewayProxyHandler = async ({body}) => {
    try {
        const requestData: Product = {...emptyProduct, ...JSON.parse(body) as Product};

        if (!isRequestDataValid<Product>(emptyProduct as Product, requestData, positiveOnly)) {
            throw new InvalidProductData();
        }

        const [result] = await productDao.add(requestData) as Product[]
        return buildResponse(result);
    } catch (error) {
        return error instanceof ProductNotFound
            ? buildResponse(error.message, ErrorCode.BAD_REQUEST)
            : buildResponse(error.message, ErrorCode.INTERNAL_SERVER_ERROR)
    }
}
