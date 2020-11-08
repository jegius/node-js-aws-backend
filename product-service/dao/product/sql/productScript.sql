create extension if not exists "uuid-ossp";
DROP TABLE IF EXISTS Products;

create table Products (
    id uuid primary key DEFAULT uuid_generate_v4(),
    description VARCHAR (255) not null,
    price INT not null,
    image_url VARCHAR (255) not null,
    title VARCHAR (255) not null
)