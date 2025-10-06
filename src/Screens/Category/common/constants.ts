import type { Category } from "../../../common/Interfaces/CategoryInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required('Campo requerido'),
    description: yup.string().notRequired(),
})

export const INIT_VALUES: Category = {
    id: "",
    name: "",
    description: "",
}