import * as Yup from 'yup'

export const userValidationSchema = Yup.object({
    email: Yup.string().email('Formato incorrecto').required('Campo requerido'),
    is_new: Yup.boolean(),
    reset_password: Yup.boolean(),

    password: Yup.string().when(['is_new', 'reset_password'], {
        is: (is_new: boolean, reset_password: boolean) => is_new || reset_password,
        then: (s) => s.trim().required('Campo requerido'),
        otherwise: (s) => s.notRequired(),
    }),

    password_2: Yup.string().when(['is_new', 'reset_password'], {
        is: (is_new: boolean, reset_password: boolean) => is_new || reset_password,
        then: (s) =>
            s
                .trim()
                .required('Campo requerido')
                .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
        otherwise: (s) => s.notRequired(),
    }),

    role: Yup.string().required('Campo requerido'),
});

export const INIT_VALUES = {
    email: '',
    password: '',
    password_2: '',
    is_new: false,
    reset_password: false,
    role: '',
}