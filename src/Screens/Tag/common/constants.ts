import type { Tag } from "../../../common/Interfaces/TagInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required('Campo requerido'),
    description: yup.string().required('Campo requerido'),
})

export const INIT_VALUES: Tag = {
    id: "",
    name: "",
    description: "",
}