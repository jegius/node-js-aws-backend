import {Client} from "pg";
import {DatabaseError} from "../errors/errors";

export interface Dao<T> {
    getById(id: string): Promise<Array<T>>;

    getAll(): Promise<Array<T>>;

    add(item: T): Promise<Array<T>>;
}

export const emptyProduct = {
    count: 0,
    description: '',
    price: 0,
    title: '',
    imageurl: ''
}

export interface Product {
    id: string;
    count: number;
    description: string;
    price: number;
    title: string;
    imageurl: string;
}


export abstract class DaoObject<T> implements Dao<T> {
    private readonly dbOptions = {
        ...process.env,
        ssl: {
            rejectUnauthorized: false
        },
        connectionTimeoutMillis: 5000
    }

    abstract add(item: T): Promise<Array<T>>;

    abstract getAll(): Promise<Array<T>>;

    abstract getById(id: string): Promise<Array<T>>;

    async doRequest(request: Function): Client {
        const client: Client = this.initClient();

        try {
            const {rows} = await request(client);
            console.log(`Server request invoked successful:`, rows)
            return rows;
        } catch (error) {
            throw new DatabaseError();
            console.error('Error during database request executing: ', error);
        } finally {
            client.end();
        }

    }

    private initClient(): Client {
        const client = new Client(this.dbOptions);
        client.connect();
        return client;
    }
}
