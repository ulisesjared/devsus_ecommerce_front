import { useFormik } from 'formik'
import ForeignInput from '../../common/Components/Inputs/ForeignInput'
import type { IPresentation } from '../../common/Interfaces/PresentationInterface'
import PageHeader from '../../common/Components/Pages/PageHeader'
import usePresentation from './hooks/PresentationProvider'
import GridInput from '../../common/Components/Inputs/GridInput'
import GridSelect from '../../common/Components/Inputs/GridSelect/GridSelect'
import useUnitMeasure from '../UnitMeasure/hooks/UnitMeasureProvider'
import type { Option } from '../../common/Components/Inputs/interfaces/SelectInterface'
import LoadingPage from '../../common/Components/Pages/LoadingPage'
import useProduct from '../Product/hooks/ProductProvider'
import { INIT_VALUES, validationSchema } from './common/constants'

export const NewPresentation = () => {

    const { createPresentation, createPresentationStatus } = usePresentation();
    const { unitMeasures, unitMeasuresStatus } = useUnitMeasure()

    const formik = useFormik<IPresentation>({
        initialValues: INIT_VALUES,
        validationSchema: validationSchema,
        onSubmit: async (values: IPresentation) => {
            createPresentation(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    const optionsUnitMeasures: Option[] = unitMeasures?.map(u => ({
        label: u.abbreviation,
        value: u.id
    })) ?? []

    const loading = createPresentationStatus === 'pending'

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Nuevo producto"
                backNavigation
                submitButton="Guardar"
                onSubmit={formik.handleSubmit}
                showSubmitButton={formik.dirty}
            />
            <div className='flex flex-1'>
                {loading ? <LoadingPage message="Creando producto" />
                    : <div className='bg-relative'>
                        <div className="absolute w-full">
                            <div className="gral-grid">
                                <h2 className='pt-4 titles'>
                                    Datos Generales
                                </h2>
                                <ForeignInput
                                    formik={formik}
                                    id="product"
                                    label="Tipo de producto"
                                    useQueryProvider={useProduct}
                                />
                                <GridInput
                                    label="Tamaño"
                                    id="size"
                                    value={formik.values.size}
                                    type="text"
                                    error={formik.touched.size && formik.errors.size}
                                    {...defaultProps}
                                />
                                <GridInput
                                    label="Cantidad"
                                    id="quantity"
                                    value={formik.values.quantity}
                                    type="text"
                                    error={formik.touched.quantity && formik.errors.quantity}
                                    {...defaultProps}
                                />
                                <GridSelect
                                    id="unit_measure"
                                    label="Unidad de medida"
                                    options={optionsUnitMeasures}
                                    loading={unitMeasuresStatus === 'pending'}
                                    value={formik.values.unit_measure}
                                    error={formik.touched.unit_measure && formik.errors.unit_measure}
                                    handleChange={(value: string) => formik.setFieldValue('unit_measure', value)}
                                    handleBlur={formik.handleBlur}
                                />
                                <GridInput
                                    label="Precio base"
                                    id="base_price"
                                    value={formik.values.base_price}
                                    type="text"
                                    error={formik.touched.base_price && formik.errors.base_price}
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
