export class DatabaseError extends Error {
    constructor() {
        super('Internal server error, no DB connection!')
    }
}

export class ProductNotFound extends Error {
    constructor() {
        super('Product not found!')
    }
}

export class InvalidProductData extends Error{
    constructor() {
        super('Provided incorrect product data!')
    }
}