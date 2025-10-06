import type { IPresentation } from "../../../common/Interfaces/PresentationInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    product: yup.string().required('Campo requerido'),
    size: yup.string().required('Campo requerido'),
    quantity: yup.string().required('Campo requerido'),
    base_price: yup.string().required('Campo requerido'),
})

export const INIT_VALUES: IPresentation = {
    id: "",
    product: "",
    size: "",
    unit_measure: "",
    quantity: "",
    base_price: "",
}