import { useFormik } from "formik"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { Color } from "../../common/Interfaces/ColorInterface"
import useColor from "./hooks/ColorProvider"
import { INIT_VALUES, validationSchema } from "./common/constants"
import GridInputColor from "../../common/Components/Inputs/GridInputColor"
import type { ColorResult } from "react-color"
//import useUsers from "../User/hooks/UsersProvider"
//import { useMemo } from "react"

export const NewColor = () => {

    const { createColor, createColorStatus } = useColor()

    const formik = useFormik<Color>({
        initialValues: INIT_VALUES,
        validationSchema: validationSchema,
        onSubmit: async (values: Color) => {
            createColor(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    const loading = [createColorStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Crear Color"
                backNavigation
                submitButton="Crear"
                onSubmit={formik.handleSubmit}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>
                {loading ? <LoadingPage message="Creando Color" />
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
                                <GridInputColor
                                    label="Color"
                                    id="code_hex"
                                    value={formik.values.code_hex}
                                    error={formik.touched.name && formik.errors.name}
                                    //onChangeComplete={(e:any)=>formik.setFieldValue('code_hex',e.hex)}
                                    onChange={(e:ColorResult)=>formik.setFieldValue('code_hex',e.hex)}
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
