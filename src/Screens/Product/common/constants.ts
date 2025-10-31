import type { IProduct } from "../../../common/Interfaces/ProductInterface";
import * as yup from 'yup'
import type { Color } from "../../../common/Interfaces/ColorInterface";
import type { ProductColor } from "../../../common/Interfaces/ProductColorInterface";

export const validationSchemaColors = yup.object({
    colors: yup.array().required(),
})

export const validationSchema = yup.object({
    id: yup.string().required(),
    name:yup.string().required(),
    description:yup.string().required()
})

export interface Colors {
    id:string
    gallery:string
    color:Color
}

export interface ProductColors{
    colors:ProductColor[]
}

export const INIT_VALUES_COLORS:ProductColors = {
    colors:[]
}

export const INIT_VALUES: IProduct = {
    id: "",
    name: "",
    description: "",
}



