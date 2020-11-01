import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import {getProductsById} from "../../../store/store";
import {buildResponse} from "../../common/helpers";

export const getAvailableProductByIdHandler: APIGatewayProxyHandler = async ({pathParameters: {id}}) => {
    try {
        const product = await getProductsById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return buildResponse(product);
    } catch (error) {
        return buildResponse(error.message, 400)
    }
}

