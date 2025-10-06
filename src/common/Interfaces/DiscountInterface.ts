export interface Discount {
    id: string,
    name: string,
    description: string,
    value: number,
    number_of_uses: number,
    is_active: boolean,
    discount_code: string,
    discount_type: 'Porcentaje' | 'Fijo'
}


