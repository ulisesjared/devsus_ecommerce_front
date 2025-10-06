import useUsers from './hooks/UsersProvider'
import { useFormik } from 'formik'
import { INIT_VALUES, userValidationSchema } from './common/constants'
import type { IUser } from './common/interfaces'
import PageHeader from '../../common/Components/Pages/PageHeader'
import LoadingPage from '../../common/Components/Pages/LoadingPage'
import GridInput from '../../common/Components/Inputs/GridInput'
import GridSelect from '../../common/Components/Inputs/GridSelect/GridSelect'

const NewUserScreen = () => {

    const { createUser, createUserStatus } = useUsers({})

    const formik = useFormik<IUser>({
        initialValues: { ...INIT_VALUES, is_new: true },
        validationSchema: userValidationSchema,
        onSubmit: (values) => {
            const formattedValues = structuredClone(values)
            delete formattedValues.is_new
            formattedValues.username = values.email
            createUser(formattedValues)
        },
    })

    const loading = createUserStatus === 'pending'

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    return (
        <div className='page-container'>
            <PageHeader
                title="Nuevo Usuario"
                backNavigation
                submitButton="Guardar"
                onSubmit={formik.handleSubmit}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>

                {loading ? <LoadingPage message="Creando usuario" /> :
                    <div className='bg-relative'>
                        <form autoComplete="off" className="absolute w-full gral-grid">

                            <h2 className='pt-4 titles'>
                                Datos Generales
                            </h2>
                            <GridInput
                                label="Correo Electrónico"
                                id="email"
                                value={formik.values.email}
                                error={formik.touched.email && formik.errors.email}
                                type="email"
                                autoComplete='off'
                                {...defaultProps}
                            />

                            <GridSelect
                                id='role'
                                label='Rol'
                                value={formik.values.role}
                                options={
                                    [
                                        { label: 'Administrador', value: 'admin' },
                                        { label: 'Repartidor', value: 'driver' },
                                    ]
                                }
                                handleChange={(value) => formik.setFieldValue("role", value)}
                                handleBlur={formik.handleBlur}
                                error={formik.touched.role && formik.errors.role}
                            />

                            <GridInput
                                label="Contraseña"
                                id="password"
                                value={formik.values.password}
                                error={formik.touched.password && formik.errors.password}
                                type="password"
                                autoComplete='off'
                                {...defaultProps}
                            />
                            <GridInput
                                label="Confirmar Contraseña"
                                id="password_2"
                                value={formik.values.password_2}
                                error={formik.touched.password && formik.errors.password}
                                type="password"
                                {...defaultProps}
                            />
                        </form>
                    </div>}
            </div>
        </div>
    )
}

export default NewUserScreen