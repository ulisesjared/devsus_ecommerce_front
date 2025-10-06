import type { IDriver } from "../../../common/Interfaces/DriverInterface";
import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required('Campo requerido'),
    description: yup.string().required('Campo requerido'),
})

export const INIT_VALUES: IDriver = {
    id: "",
    name: "",
    phone: "",
    user: "",
}