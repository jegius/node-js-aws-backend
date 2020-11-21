import 'source-map-support/register';
import {importProductsFileHandler} from "./handlers/importProductsFile/importProductsFile";
import {importFileParserHandler} from "./handlers/importFileParser/importFileParser";
import {APIGatewayProxyHandler, S3Handler} from "aws-lambda";
import {catalogBatchProcessHandler} from "./handlers/catalogBatchProcess/catalogBatchProcess";

export const importProductsFile: APIGatewayProxyHandler = importProductsFileHandler;
export const importFileParser: S3Handler = importFileParserHandler;
export const catalogBatchProcess: S3Handler = catalogBatchProcessHandler;