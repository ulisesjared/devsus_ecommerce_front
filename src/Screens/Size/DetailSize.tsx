import { useFormik } from "formik"
import TrashButton from "../../common/Components/Buttons/TrashButton"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { Size } from "../../common/Interfaces/SizeInterface"
import useSize from "./hooks/SizeProvider"
import { useParams } from "react-router-dom"
import { INIT_VALUES, validationSchema } from "./common/constants"


export const DetailSize = () => {
    const { id } = useParams()
    const {
        size,
        sizeStatus,
        updateSize,
        updateSizeStatus,
        deleteSize,
        deleteSizeStatus
    } = useSize({ id, enabled: true})

    const formik = useFormik<Size>({
        initialValues: size ?? INIT_VALUES,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values: Size) => {
            updateSize(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }
    const loading = [sizeStatus, updateSizeStatus, deleteSizeStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Editar Talla"
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
                                    label="Talla"
                                    id="value"
                                    value={formik.values.value}
                                    type="text"
                                    error={formik.touched.value && formik.errors.value}
                                    {...defaultProps}
                                />
                        
                                <h2 className='pt-4 titles'>
                                    Opciones
                                </h2>
                                <TrashButton
                                    className="h-8 w-full col-span-2"
                                    message="Eliminar Talla"
                                    onPress={() => id && deleteSize()}
                                    confirmationNeeded
                                    confirmationMessage="¿Estás seguro de eliminar esta talla?"
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
