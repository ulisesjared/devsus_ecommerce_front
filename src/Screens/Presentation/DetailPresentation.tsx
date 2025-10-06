import { useParams } from "react-router-dom"
import usePresentation from "./hooks/PresentationProvider"
import type { IPresentation } from "../../common/Interfaces/PresentationInterface"
import { useFormik } from "formik"
import ForeignInput from "../../common/Components/Inputs/ForeignInput"
import GridInput from "../../common/Components/Inputs/GridInput"
import PageHeader from "../../common/Components/Pages/PageHeader"
import TrashButton from "../../common/Components/Buttons/TrashButton"
import GridSelect from "../../common/Components/Inputs/GridSelect/GridSelect"
import useUnitMeasure from "../UnitMeasure/hooks/UnitMeasureProvider"
import type { Option } from "../../common/Components/Inputs/interfaces/SelectInterface"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import useProduct from "../Product/hooks/ProductProvider"
import { INIT_VALUES, validationSchema } from "./common/constants"

export const DetailPresentation = () => {

  const { id } = useParams()

  const {
    presentation,
    presentationsStatus,
    updatePresentation,
    updatePresentationStatus,
    deletePresentation,
    deletePresentationStatus
  } = usePresentation(id)

  const { unitMeasures, unitMeasuresStatus } = useUnitMeasure()

  const formik = useFormik<IPresentation>({
    initialValues: presentation ?? INIT_VALUES,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values: IPresentation) => {
      updatePresentation(values);
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

  const loading = [presentationsStatus, updatePresentationStatus, deletePresentationStatus].includes('pending');

  return (
    <div className='flex flex-col flex-1 gap-2 p-2'>
      <PageHeader
        title="Editar producto"
        backNavigation
        submitButton="Editar"
        onSubmit={formik.handleSubmit}
        showSubmitButton={formik.dirty}
      />
      <div className='flex flex-1'>
        {loading ? <LoadingPage message="Editando producto" />
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

                <TrashButton
                  className="h-8 w-full col-span-2"
                  message="Eliminar producto"
                  onPress={() => id && deletePresentation(id)}
                  confirmationNeeded
                  confirmationMessage="¿Estás seguro de eliminar este producto?"
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
