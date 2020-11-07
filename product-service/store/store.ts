export const products = [
    {
        "count": 4,
        "description": "Short Product Description1",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 2.4,
        "title": "Cyberpunk 2077"
    },
    {
        "count": 6,
        "description": "Short Product Description3",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
        "price": 10,
        "title": "Civilization 7"
    },
    {
        "count": 7,
        "description": "Short Product Description2",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "price": 23,
        "title": "Gothic 7"
    },
    {
        "count": 12,
        "description": "Short Product Description7",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        "price": 15,
        "title": "The elder scrolls 6"
    },
    {
        "count": 7,
        "description": "Short Product Description2",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "price": 23,
        "title": "The Witcher 4"
    },
    {
        "count": 8,
        "description": "Short Product Description4",
        "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        "price": 15,
        "title": "Mass Effect 4"
    },
    {
        "count": 2,
        "description": "Short Product Descriptio1",
        "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        "price": 23,
        "title": "Uncharted 5"
    },
    {
        "count": 3,
        "description": "Short Product Description7",
        "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        "price": 15,
        "title": "GTA 6"
    }
]

export const getProducts = async () => products;
export const getProductsById = async (id: string) => products.find(product => product.id === id)
