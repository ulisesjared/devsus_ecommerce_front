import { useFormik } from "formik"
import TrashButton from "../../common/Components/Buttons/TrashButton"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { Color } from "../../common/Interfaces/ColorInterface"
import useColor from "./hooks/ColorProvider"
import { useParams } from "react-router-dom"
import { INIT_VALUES, validationSchema } from "./common/constants"
import GridInputColor from "../../common/Components/Inputs/GridInputColor"
import type { ColorResult } from "react-color"


export const DetailColor = () => {
    const { id } = useParams()
    const {
        color,
        colorStatus,
        updateColor,
        updateColorStatus,
        deleteColor,
        deleteColorStatus
    } = useColor({ id, enabled: true})

    const formik = useFormik<Color>({
        initialValues: color ?? INIT_VALUES,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values: Color) => {
            updateColor(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }
    const loading = [colorStatus, updateColorStatus, deleteColorStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Editar Color"
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
                                <GridInputColor
                                    label="Color"
                                    id="code_hex"
                                    
                                    value={formik.values.code_hex}
                                    error={formik.touched.name && formik.errors.name}
                                    onChange={(e:ColorResult)=>formik.setFieldValue('code_hex',e.hex)}
                                    {...defaultProps}
                                />
                                <h2 className='pt-4 titles'>
                                    Opciones
                                </h2>
                                <TrashButton
                                    className="h-8 w-full col-span-2"
                                    message="Eliminar color"
                                    onPress={() => id && deleteColor(id)}
                                    confirmationNeeded
                                    confirmationMessage="¿Estás seguro de eliminar este color?"
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
