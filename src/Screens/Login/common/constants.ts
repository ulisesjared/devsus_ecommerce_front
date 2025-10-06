import * as Yup from 'yup';
export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Formato inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
})

export const INIT_VALUES = {
    email: '',
    password: '',
}