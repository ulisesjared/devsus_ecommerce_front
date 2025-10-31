import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { myAxios } from "../../../common/hooks/useAxios"
import type { Colors} from "../common/constants"
import { getErrorMessage } from "../../../common/Constants/functions"
import { useToast } from "../../../common/hooks/ToastProvider"
import type { ProductColor } from "../../../common/Interfaces/ProductColorInterface";


const useProductColor = ({ id, enabled = true }: {id?:string, enabled?: boolean }={}) => {

    const { notify } = useToast()
    const qc = useQueryClient()
    const {
        data: productColors,
        status: productColorsStatus,
    } = useQuery<Colors[]>({
        queryKey: ['product_colors', id],
        queryFn: async () => {
            const res = await myAxios.get(`/product/${id}/colors/`)
            return res.data
        },
        enabled: enabled && !!id,
    })

    const { 
        mutate: createProductColor,
        status: createProductColorStatus
    } = useMutation({
        mutationFn: async (data: ProductColor[]) => {
            const res = await myAxios.post(`/product_color/`, data)
            return res.data
        },
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['product_colors',id], exact:true})
            qc.invalidateQueries({queryKey: ['products'], exact:true})
            notify(`Color agregado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })
    
    const { 
        mutate: updateProductColor,
        status: updateProductColorsStatus
    } = useMutation({
        mutationFn: async (data: Partial<ProductColor>) => {
            const res = await myAxios.patch(`/product/${id}/admin_variants/`, data)
            return res.data
        },
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['product_colors',id], exact:true})
            qc.invalidateQueries({queryKey: ['products'], exact:true})
            notify(`Registro de producto editado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })

    const {
        mutate:deleteProductColor,
        status:deleteProductColorStatus
    } = useMutation({
        mutationFn: async (id:string) => {
            const res = await myAxios.delete(`/product_color/${id}/`)
            return res.data
        },
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['product_colors',id], exact:true})
            qc.invalidateQueries({queryKey: ['products'], exact:true})
            notify(`Registro de color eliminado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })

    return ({
        productColors,
        productColorsStatus,
        updateProductColor,
        updateProductColorsStatus,
        deleteProductColor,
        deleteProductColorStatus,
        createProductColor,
        createProductColorStatus
    })
}

export default useProductColor