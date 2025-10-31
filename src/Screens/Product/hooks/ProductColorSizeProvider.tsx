import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { myAxios } from "../../../common/hooks/useAxios"
import { getErrorMessage } from "../../../common/Constants/functions"
import { useToast } from "../../../common/hooks/ToastProvider"
import type { ProductColorSize } from "../../../common/Interfaces/IProductColorSize";

const useProductColorSize = ({id, enabled=true}:{id?:string, enabled?:boolean})=>{
    const { notify } = useToast()
    const qc = useQueryClient()

    const {
        data: productColorSizes,
        status: productColorSizesStatus,
    } = useQuery<ProductColorSize[]>({
        queryKey: ['product_color_sizes', id],
        queryFn: async () => {
            const res = await myAxios.get(`/product_color/${id}/sizes/`)
            return res.data
        },
        enabled: enabled && !!id,
    })

    const{ 
        mutate: createProductColorSize,
        status: createProductColorSizeStatus
    } = useMutation({
        mutationFn: async (data: ProductColorSize[]) => {
            const res = await myAxios.post(`/product_color/`, data)
            return res.data
        },
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['product_color_size',id], exact:true})
            notify(`Talla agregada con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })

    const {
        mutate:deleteProductColorSize,
        status:deleteProductColorSizeStatus
    } = useMutation({
        mutationFn: async (id:string) => {
            const res = await myAxios.delete(`/product_color_size/${id}/`)
            return res.data
        },
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['product_color_size',id], exact:true})
            notify(`Registro de talla eliminada con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })



    return({
        productColorSizes,
        productColorSizesStatus,
        createProductColorSize,
        createProductColorSizeStatus,
        deleteProductColorSize,
        deleteProductColorSizeStatus    
    })
}

export default useProductColorSize