import type { IProduct } from "../../../common/Interfaces/ProductInterface";
import * as yup from 'yup'
import type { Color } from "../../../common/Interfaces/ColorInterface";
import type { ProductColor } from "../../../common/Interfaces/ProductColorInterface";
import type { ProductColorSize } from "../../../common/Interfaces/IProductColorSize";

export const validationSchemaColors = yup.object({
    colors: yup.array().required(),
})

const productColorSizeSchema=yup.object({
    size: yup.string().required('Debes seleccionar una opción'),
    stock: yup.number()
        .typeError('Debe ser un número')
        .min(0, 'No puede ser negativo')
        .integer('Debe ser un número entero')
        .required('Es requerido'),

    price: yup.number()
        .typeError('Debe ser un número')
        .min(0, 'No puede ser negativo')
        .required('Es requerido'),
    discount: yup.string().notRequired().nullable(),
})

export const productColorSizeValidationSchema=yup.object({
    sizes:yup.array().of(productColorSizeSchema)
})

export const validationSchema = yup.object({
    id: yup.string().required(),
    name:yup.string().required(),
    description:yup.string().required()
})

export interface Colors {
    id:string
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

export interface Sizes{
    sizes:ProductColorSize[]
}

