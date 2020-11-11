import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {buildResponse, ErrorCode} from "../../common/helpers";
import {productDao} from "../../../dao/product/productDao";
import {ProductNotFound} from "../../../errors/errors";
import {Product} from "../../../dao/daoAPI";

export const getAvailableProductByIdHandler: APIGatewayProxyHandler = async ({pathParameters: {id}}) => {
    try {
        const [product] = await productDao.getById(id) as Product[];

        if (!product) {
            throw new ProductNotFound();
        }

        return buildResponse(product);
    } catch (error) {
        return error instanceof ProductNotFound
            ? buildResponse(error.message, ErrorCode.BAD_REQUEST)
            : buildResponse(error.message, ErrorCode.INTERNAL_SERVER_ERROR)
    }
}

