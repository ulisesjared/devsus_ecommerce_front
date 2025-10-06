import { useFormik } from "formik"
import TrashButton from "../../common/Components/Buttons/TrashButton"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { IDriver } from "../../common/Interfaces/DriverInterface"
import useDriver from "./hooks/DriverProvider"
import { useParams } from "react-router-dom"
import GridPhoneInput from "../../common/Components/Inputs/GridPhoneInput"
import { INIT_VALUES, validationSchema } from "./common/constants"
import GridSelect from "../../common/Components/Inputs/GridSelect/GridSelect"
import useUsers from "../User/hooks/UsersProvider"
import { useMemo } from "react"


export const DetailDriver = () => {
    const { id } = useParams()
    const {
        driver,
        driverStatus,
        updateDriver,
        updateDriverStatus,
        deleteDriver,
        deleteDriverStatus
    } = useDriver(id)

    const { users } = useUsers({})
    const userOptions = useMemo(() => users?.map((user) => ({ label: user.email, value: user.id ?? "" })) ?? [], [users])

    const formik = useFormik<IDriver>({
        initialValues: driver ?? INIT_VALUES,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values: IDriver) => {
            updateDriver(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }
    const loading = [driverStatus, updateDriverStatus, deleteDriverStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Editar repartidor"
                backNavigation
                submitButton="Editar"
                onSubmit={formik.handleSubmit}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>
                {loading ? <LoadingPage message="Cargando..." />
                    : <div className='bg-relative'>
                        <div className="absolute w-full">
                            <div className="gral-grid">
                                <h2 className='pt-4 titles'>
                                    Datos Generales
                                </h2>
                                <GridInput
                                    label="Nombre"
                                    id="name"
                                    value={formik.values.name}
                                    type="text"
                                    error={formik.touched.name && formik.errors.name}
                                    {...defaultProps}
                                />
                                <GridPhoneInput
                                    label="Telefono"
                                    id="phone"
                                    formik={formik}
                                    placeholder=""
                                />
                                <GridSelect
                                    label="Usuario"
                                    id="user"
                                    value={formik.values.user}
                                    options={userOptions}
                                    error={formik.touched.user && formik.errors.user}
                                    handleChange={(value) => formik.setFieldValue('user', value)}
                                    handleBlur={formik.handleBlur}
                                />
                                <h2 className='pt-4 titles'>
                                    Opciones
                                </h2>
                                <TrashButton
                                    className="h-8 w-full col-span-2"
                                    message="Eliminar repartidor"
                                    onPress={() => id && deleteDriver(id)}
                                    confirmationNeeded
                                    confirmationMessage="¿Estás seguro de eliminar este repartidor?"
                                    confirmationTitle='Eliminar información'
                                    confirmationButtonLabel="Eliminar"
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
