import { useFormik } from "formik"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { Size } from "../../common/Interfaces/SizeInterface"
import useSize from "./hooks/SizeProvider"
import { INIT_VALUES, validationSchema } from "./common/constants"
//import useUsers from "../User/hooks/UsersProvider"
//import { useMemo } from "react"

export const NewSize = () => {

    const { createSize, createSizeStatus } = useSize()

    const formik = useFormik<Size>({
        initialValues: INIT_VALUES,
        validationSchema: validationSchema,
        onSubmit: async (values: Size) => {
            createSize(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    const loading = [createSizeStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Crear Talla"
                backNavigation
                submitButton="Crear"
                onSubmit={formik.handleSubmit}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>
                {loading ? <LoadingPage message="Creando Talla" />
                    : <div className='bg-relative'>
                        <div className="absolute w-full">
                            <div className="gral-grid">
                                <h2 className='pt-4 titles'>
                                    Datos Generales
                                </h2>
                                <GridInput
                                    label="Talla"
                                    id="value"
                                    value={formik.values.value}
                                    type="text"
                                    error={formik.touched.value && formik.errors.value}
                                    {...defaultProps}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
