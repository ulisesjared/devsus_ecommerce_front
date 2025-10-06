import { useFormik } from "formik"
import TrashButton from "../../common/Components/Buttons/TrashButton"
import GridInput from "../../common/Components/Inputs/GridInput"
import LoadingPage from "../../common/Components/Pages/LoadingPage"
import PageHeader from "../../common/Components/Pages/PageHeader"
import type { Category } from "../../common/Interfaces/CategoryInterface"
import useCategory from "./hooks/CategoryProvider"
import { useParams } from "react-router-dom"
import { INIT_VALUES, validationSchema } from "./common/constants"
import { GridTextArea } from "../../common/Components/Inputs/GridTextArea"


export const DetailCategory = () => {
    const { id } = useParams()
    const {
        category,
        categoryStatus,
        updateCategory,
        updateCategoryStatus,
        deleteCategory,
        deleteCategoryStatus
    } = useCategory({ id, enabled: true})

    const formik = useFormik<Category>({
        initialValues: category ?? INIT_VALUES,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values: Category) => {
            updateCategory(values);
        }
    })

    const defaultProps = {
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
    }
    const loading = [categoryStatus, updateCategoryStatus, deleteCategoryStatus].includes('pending');

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader
                title="Editar Categoría"
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
                                <h2 className='pt-4 titles'>
                                    Opciones
                                </h2>
                                <TrashButton
                                    className="h-8 w-full col-span-2"
                                    message="Eliminar categoría"
                                    onPress={() => id && deleteCategory()}
                                    confirmationNeeded
                                    confirmationMessage="¿Estás seguro de eliminar esta categoría?"
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
