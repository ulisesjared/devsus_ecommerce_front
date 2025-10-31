import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { myAxios } from "../../../common/hooks/useAxios"
import type { IProduct } from "../../../common/Interfaces/ProductInterface"
import { getErrorMessage } from "../../../common/Constants/functions"
import { useToast } from "../../../common/hooks/ToastProvider"


const useProductInfo = ({ id, enabled = true }: {id?:string, enabled?: boolean }={}) => {

    const { notify } = useToast()
    const qc = useQueryClient()
    const {
        data: productInfo,
        status: productInfoStatus,
        refetch: productInfoRefetch
    } = useQuery<IProduct>({
        queryKey: ['product_info', id],
        queryFn: async () => {
            const res = await myAxios.get(`/product/${id}/admin_info`)
            return res.data
        },
        enabled: enabled && !!id,
    })

    const { 
        mutate: updateProductInfo,
        status: updateProductInfoStatus,
    } = useMutation({
        mutationFn: async (data: Partial<IProduct>) => {
            const res = await myAxios.patch(`/product/${id}/`, data)
            return res.data
        },
        onSuccess: () => {
            productInfoRefetch()
            qc.invalidateQueries({queryKey: ['products'], exact:true})
            notify(`Registro de producto editado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })
    
    const { 
        mutate: deleteProduct,
        status: deleteProductStatus,
    } = useMutation({
        mutationFn: async () => {
            const res = await myAxios.delete(`/product/${id}/`)
            return res.data
        },
        onSuccess: () => {
            productInfoRefetch()
            qc.invalidateQueries({queryKey: ['products'], exact:true})
            notify(`Registro de producto editado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })

    return ({
        updateProductInfo,
        updateProductInfoStatus,
        productInfo,
        productInfoStatus,
        deleteProduct,
        deleteProductStatus,
    })
}

export default useProductInfo