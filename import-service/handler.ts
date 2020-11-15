import {APIGatewayProxyHandler} from "aws-lambda";
import 'source-map-support/register';
import {importProductsFileHandler} from "./handlers/importFileParser/importProductsFile";
import {importFileParserHandler} from "./handlers/uploadFile/importFileParser";

export const importProductsFile: APIGatewayProxyHandler = importProductsFileHandler;
export const importFileParser: APIGatewayProxyHandler = importFileParserHandler;