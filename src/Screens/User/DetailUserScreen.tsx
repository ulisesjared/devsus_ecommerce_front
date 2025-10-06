import useUsers from './hooks/UsersProvider'
import { useFormik } from 'formik'
import { INIT_VALUES, userValidationSchema } from './common/constants'
import type { IUser } from './common/interfaces'
import PageHeader from '../../common/Components/Pages/PageHeader'
import LoadingPage from '../../common/Components/Pages/LoadingPage'
import GridInput from '../../common/Components/Inputs/GridInput'
import GridSelect from '../../common/Components/Inputs/GridSelect/GridSelect'
import { useParams } from 'react-router-dom'
import TrashButton from '../../common/Components/Buttons/TrashButton'
import GridCheck from '../../common/Components/Inputs/GridCheck'

const DetailUserScreen = () => {
    const { id } = useParams()
    const {
        user, userStatus,
        updateUser,
        updateUserStatus,
        deleteUser,
        deleteUserStatus,
    } = useUsers({ id })

    const formik = useFormik<IUser>({
        initialValues: user ? ({ ...INIT_VALUES, ...user }) : INIT_VALUES,
        validationSchema: userValidationSchema,
        onSubmit: (values) => {
            const formattedValues = structuredClone(values)
            delete formattedValues.is_new
            updateUser(formattedValues)
        },
        enableReinitialize: true,
    })

    const loading = [userStatus, updateUserStatus, deleteUserStatus].includes('pending')

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    return (
        <div className='page-container'>
            <PageHeader
                title="Editar Usuario"
                backNavigation
                submitButton="Guardar"
                onSubmit={async () => {
                    console.log(await formik.validateForm())
                    formik.handleSubmit()
                }}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>

                {loading ? <LoadingPage message="Cargando..." /> :
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

                            <GridCheck
                                label="Actualizar contraseña"
                                id="reset_password"
                                value={formik.values.reset_password}
                                error={formik.touched.reset_password && formik.errors.reset_password}
                                type="checkbox"
                                handleChange={(e) => formik.setFieldValue("reset_password", e.target.checked)}
                                handleBlur={formik.handleBlur}
                            />
                            {formik.values.reset_password && <>
                                <GridInput
                                    label="Nueva contraseña"
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
                                    error={formik.touched.password_2 && formik.errors.password_2}
                                    type="password"
                                    {...defaultProps}
                                />
                            </>
                            }
                            <h2 className='pt-4 titles'>
                                Opciones
                            </h2>
                            <TrashButton
                                className='col-span-2 h-8'
                                onPress={() => deleteUser()}
                                message="Eliminar usuario"
                            />
                        </form>
                    </div>}
            </div>
        </div>
    )
}

export default DetailUserScreen