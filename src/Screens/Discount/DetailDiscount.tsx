import { useFormik } from "formik"
import TrashButton from "../../common/Components/Buttons/TrashButton"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { Discount } from "../../common/Interfaces/DiscountInterface"
import useDiscount from "./hooks/DiscountProvider"
import { useParams } from "react-router-dom"
import { INIT_VALUES, validationSchema } from "./common/constants"
import { GridTextArea } from "../../common/Components/Inputs/GridTextArea"
import GridSelect from "../../common/Components/Inputs/GridSelect/GridSelect"
import GridCheck from "../../common/Components/Inputs/GridCheck"

export const DetailDiscount = () => {
    const { id } = useParams()
    const {
        discount,
        discountStatus,
        updateDiscount,
        updateDiscountStatus,
        deleteDiscount,
        deleteDiscountStatus
    } = useDiscount({ id, enabled: true})

    const formik = useFormik<Discount>({
        initialValues: discount ?? INIT_VALUES,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values: Discount) => {
            updateDiscount(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }
    const loading = [discountStatus, updateDiscountStatus, deleteDiscountStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Editar Descuento"
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
                                <GridTextArea
                                    label="Descripción"
                                    id="description"
                                    value={formik.values.description}
                                    error={formik.touched.description && formik.errors.description}
                                    {...defaultProps}
                                    type="text"
                                />
                                <GridInput
                                    label="Valor"
                                    id="value"
                                    value={(formik.values.value ?? '').toString()}
                                    type="number"
                                    error={formik.touched.value && formik.errors.value}
                                    {...defaultProps}
                                />
                                <GridInput
                                    label="Número de usos"
                                    id="number_of_uses"
                                    value={formik.values.number_of_uses?.toString() ?? ''}
                                    type="number"
                                    error={formik.touched.number_of_uses && formik.errors.number_of_uses}
                                    {...defaultProps}
                                />
                                <GridInput
                                    label=" Código de descuento"
                                    id="discount_code"
                                    value={(formik.values.discount_code ?? '')}
                                    type="text"
                                    error={formik.touched.discount_code && formik.errors.discount_code}
                                    {...defaultProps}
                                />
                                <GridSelect
                                    label="Tipo de descuento"
                                    id="discount_type"
                                    value={formik.values.discount_type}
                                    options={[
                                        { label: 'Porcentaje', value: 'Porcentaje' },
                                        { label: 'Fijo', value: 'Fijo' },
                                    ]}
                                    error={formik.touched.discount_type && formik.errors.discount_type}
                                    
                                    handleBlur={formik.handleBlur}
                                    handleChange={(e:string) => formik.setFieldValue('discount_type', e)}
                                />
                                <GridCheck
                                    label="Activo"
                                    id="is_active"
                                    value={formik.values.is_active ?? false}
                                    error={formik.touched.is_active && formik.errors.is_active}
                                    {...defaultProps}
                                />

                                <h2 className='pt-4 titles'>
                                    Opciones
                                </h2>
                                <TrashButton
                                    className="h-8 w-full col-span-2"
                                    message="Eliminar descuento"
                                    onPress={() => id && deleteDiscount()}
                                    confirmationNeeded
                                    confirmationMessage="¿Estás seguro de eliminar este descuento?"
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
