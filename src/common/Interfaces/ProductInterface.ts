interface IProductColors{
    id: string,
    color: string,
    gallery?: string,
    product_color_sizes?: IProductColorSizes[],
}

interface IProductColorSizes{
    id: string,
    size: string,   
    stock: number,
    price: number,
    metadata?: string,
    discount?: string,
}

export interface IProduct {
    id: string,
    name?: string,
    description?: string,
    product_colors?: IProductColors[],   
}

