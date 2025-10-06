import type { Discount } from "../../../common/Interfaces/DiscountInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required('Campo requerido'),
    description: yup.string().notRequired(),
    value: yup.number().required('Campo requerido').min(0, 'El valor debe ser mayor o igual a 0'),
    number_of_uses: yup.number().required('Campo requerido').min(1, 'El número de usos debe ser mayor o igual a 1'),
    is_active: yup.boolean().required('Campo requerido'),
    discount_code: yup.string().notRequired(),
    discount_type: yup.mixed<'Porcentaje' | 'Fijo'>().oneOf(['Porcentaje', 'Fijo']).required('Campo requerido'),
})

export const INIT_VALUES: Discount = {
    id: "",
    name: "",
    description: "",
    value: 0,
    number_of_uses: 1,
    is_active: true,
    discount_code: "",
    discount_type: 'Porcentaje'
}