import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {getAvailableProductsHandler} from "./handlers/products/getProducts/getProducts";
import {getAvailableProductByIdHandler} from "./handlers/products/getProductById/getProductById";
import {addProductHandler} from "./handlers/products/addProduct/addProduct";

export const getAvailableProducts: APIGatewayProxyHandler = getAvailableProductsHandler;
export const getAvailableProductById: APIGatewayProxyHandler = getAvailableProductByIdHandler;
export const addProduct: APIGatewayProxyHandler = addProductHandler;
