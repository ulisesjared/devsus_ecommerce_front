import { useFormik } from "formik"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { IDriver } from "../../common/Interfaces/DriverInterface"
import useDriver from "./hooks/DriverProvider"
import GridPhoneInput from "../../common/Components/Inputs/GridPhoneInput"
import { INIT_VALUES, validationSchema } from "./common/constants"
import useUsers from "../User/hooks/UsersProvider"
import GridSelect from "../../common/Components/Inputs/GridSelect/GridSelect"
import { useMemo } from "react"

export const NewDriver = () => {

    const { createDriver, createDriverStatus } = useDriver()
    const { users } = useUsers({})

    const formik = useFormik<IDriver>({
        initialValues: INIT_VALUES,
        validationSchema: validationSchema,
        onSubmit: async (values: IDriver) => {
            createDriver(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    const userOptions = useMemo(() => users?.map((user) => ({ label: user.email, value: user.id ?? "" })) ?? [], [users])
    const loading = [createDriverStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Crear repartidor"
                backNavigation
                submitButton="Crear"
                onSubmit={formik.handleSubmit}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>
                {loading ? <LoadingPage message="Creando repartidor" />
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
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
