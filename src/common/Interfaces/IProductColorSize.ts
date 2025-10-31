import  type {Size}  from "./SizeInterface"
import type { Discount } from "./DiscountInterface"
export interface ProductColorSize{
    id:string,
    size?:Size,
    stock:number,
    price:number,
    product_color?:string
    metadata?:string
    discount:Discount
}
