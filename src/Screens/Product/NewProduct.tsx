import { useFormik } from "formik"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { IProduct } from "../../common/Interfaces/ProductInterface"
import useProduct from "./hooks/ProductProvider"
import { INIT_VALUES, validationSchema } from "./common/constants"
import { GridTextArea } from "../../common/Components/Inputs/GridTextArea"

export const NewProduct = () => {

    // const { createProduct, createProductStatus } = useProduct()

    // const formik = useFormik<IProduct>({
    //     initialValues: INIT_VALUES,
    //     validationSchema: validationSchema,
    //     onSubmit: async (values: IProduct) => {
    //         createProduct(values);
    //     }   
    // })

    // const defaultProps = {
    //     handleChange: formik.handleChange,
    //     handleBlur: formik.handleBlur,
    // }

    // const loading = [createProductStatus].includes('pending');

    return (
        // <div className='flex flex-col flex-1 gap-2 p-2'>
        //     <PageHeader
        //         title="Crear Producto"
        //         backNavigation
        //         submitButton="Crear"
        //         onSubmit={formik.handleSubmit}
        //         showSubmitButton={formik.dirty}
        //     />
        //     <div className='flex flex-1'>
        //         {loading ? <LoadingPage message="Creando Producto" />
        //             : <div className='bg-relative'>
        //                 <div className="absolute w-full">
        //                     <div className="gral-grid">
        //                         <h2 className='pt-4 titles'>
        //                             Datos Generales
        //                         </h2>
        //                         <GridInput
        //                             label="Nombre"
        //                             id="name"
        //                             value={formik.values.name}
        //                             type="text"
        //                             error={formik.touched.name && formik.errors.name}
        //                             {...defaultProps}
        //                         />
        //                         <GridTextArea
        //                             label="Descripción"
        //                             id="description"
        //                             value={formik.values.description}
        //                             error={formik.touched.description && formik.errors.description}
        //                             {...defaultProps}
        //                             type="text"
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //         }
        //     </div>
        // </div>
        <div></div>
    )
}
