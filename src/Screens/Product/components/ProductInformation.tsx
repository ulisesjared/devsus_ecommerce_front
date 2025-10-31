import TrashButton from "../../../common/Components/Buttons/TrashButton"
import GridInput from "../../../common/Components/Inputs/GridInput"
import LoadingPage from "../../../common/Components/Pages/LoadingPage"
import type { IProduct } from "../../../common/Interfaces/ProductInterface"
import { validationSchema, INIT_VALUES } from '../common/constants'
import { GridTextArea } from "../../../common/Components/Inputs/GridTextArea"
import Scroll from "../../../ui/layout/Scroll"
import  type {FormikProps}  from "formik"
import useProductInfo from "../hooks/ProductInfoProvider"
import { useFormik } from "formik"

export const ProductInformation = ({
    id,
}:{id?:string}) => {

    const {
        productInfo,
        productInfoStatus,
        updateProductInfo,
        updateProductInfoStatus,
        deleteProduct,
        deleteProductStatus,

    }=useProductInfo({id})
    
    const loading = [productInfoStatus, updateProductInfoStatus,  deleteProductStatus].includes('pending');
    
    
    const formik: FormikProps<IProduct> = useFormik<IProduct>({
        initialValues: productInfo ?? INIT_VALUES,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateProductInfo(values)
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }

    return (
        <div className='flex flex-col flex-1 gap-2'>
            <div className='flex flex-1 bg-white rounded-b-md shadow-sm' >

                {loading ? <LoadingPage message="Cargando..." />
                    :<Scroll> 
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
                            <h2 className='pt-4 titles'>
                                Opciones
                            </h2>
                            <TrashButton
                                className="h-8 w-full col-span-2"
                                message="Eliminar producto"
                                onPress={() => formik.values.id && deleteProduct()}
                                confirmationNeeded
                                confirmationMessage="¿Estás seguro de eliminar este producto?"
                                confirmationTitle='Eliminar información'
                                confirmationButtonLabel="Eliminar"
                            />
                        </div>

                    </Scroll>
                }
            </div>
        </div>
    )
}

export default ProductInformation