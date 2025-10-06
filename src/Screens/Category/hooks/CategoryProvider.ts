import { useMemo } from "react"
import useGeneric from "../../../common/hooks/Generic"
import type { Category } from "../../../common/Interfaces/CategoryInterface"

const useCategory = ({ id, enabled = true }: { id?: string, enabled?: boolean }={}) => {

    const {
        list: categories, listStatus: categoriesStatus,
        retrieve: category, retrieveStatus: categoryStatus,
        create: createCategory, createStatus: createCategoryStatus,
        update: updateCategory, updateStatus: updateCategoryStatus,
        delete: deleteCategory, deleteStatus: deleteCategoryStatus,
    } = useGeneric<Category>({
        module: 'category',
        listQueryKey: 'categories',
        retrieveQueryKey: 'category',
        apiUrl: 'category',
        redirectUrl: 'category',
        objectId: id,
        enabled: enabled,
    })

    const CategoriesMap = useMemo(() => (
        Object.fromEntries(categories?.map(c => [c.id, c]) ?? [])
    ), [categories])

    return {
        categories, categoriesStatus,
        category, categoryStatus,
        createCategory, createCategoryStatus,
        updateCategory, updateCategoryStatus,
        deleteCategory, deleteCategoryStatus,
        CategoriesMap
    }
}

export default useCategory