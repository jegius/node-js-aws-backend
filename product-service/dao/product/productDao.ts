import {DaoObject, Product} from "../daoAPI";
import {Client} from "pg";
import {addProductQuery, getProductByIdQuery, getProductsQuery} from "./queries";

class ProductDao extends DaoObject<Product> {
    async add({count, description, price, title, imageUrl}: Product): Promise<Array<Product>> {
        return this
            .doRequest((client: Client) => client.query(addProductQuery, [description, price, title, imageUrl, count]));
    }

    async getAll(): Promise<Array<Product>> {
        return this
            .doRequest((client: Client) => client.query(getProductsQuery));
    }

    async getById(id: string): Promise<Array<Product>> {
        return this
            .doRequest((client: Client) => client.query(getProductByIdQuery, [id]));
    }
}

export const productDao = new ProductDao();

