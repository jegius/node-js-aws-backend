export const getProductsQuery: string = `
select p.id, p.description, p.price, p.title, p.image_url, s.count from products p left join stocks s on p.id = s.product_id
`;
export const getProductByIdQuery: string = `
select p.id, p.description, p.price, p.title, p.image_url, s.count from products p left join stocks s on p.id = s.product_id where p.id = $1
`;
export const addProductQuery: string = `
WITH product AS (
    INSERT INTO products (description, price, title, image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING description, price, title, image_url, id as product_id
),
     stock as (
         INSERT INTO stocks (product_id, count)
             SELECT product_id, $5 FROM product
             RETURNING count, product_id
     )
SELECT product.product_id as id, product.description, product.title, product.price, product.image_url as imageurl, stock.count
FROM product join stock on stock.product_id = product.product_id
`;
