import type { Color } from "../../../common/Interfaces/ColorInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required('Campo requerido'),
    code_hex: yup.string().required('Campo requerido'),
})

export const INIT_VALUES: Color = {
    id: "",
    name: "",
    code_hex: "",
}