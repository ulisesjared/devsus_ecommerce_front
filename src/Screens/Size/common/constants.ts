import type { Size } from "../../../common/Interfaces/SizeInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    value: yup.string().required('Campo requerido'),
})

export const INIT_VALUES: Size = {
    id: "",
    value: ""
}