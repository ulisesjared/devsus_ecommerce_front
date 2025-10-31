import { useQuery, useMutation } from "@tanstack/react-query"
import { myAxios } from "../../../common/hooks/useAxios"
import type { IProduct } from "../../../common/Interfaces/ProductInterface"
import { getErrorMessage } from "../../../common/Constants/functions"
import { useToast } from "../../../common/hooks/ToastProvider"

const useProduct = ({ id, enabled = true }: {id?:string, enabled?: boolean }={}) => {

    const { notify } = useToast()


    const {
        data: listProduct,
        status: listProductStatus
    } = useQuery<IProduct[]>({
            queryKey: ['products'],
            queryFn: async () => {
                const res = await myAxios.get('product/')
                return res.data
            },
            //enabled: enabled && !!id,
        })

    const {
        mutate: deleteProduct,
        status: deleteProductStatus
    } = useMutation({
        mutationFn: async () => {
            const res = await myAxios.delete(`/product/${id}/`)
            return res.data
        },
        onSuccess: () => {
            
            notify(`Registro de producto editado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }

    })

    

    return ({
        
        deleteProduct,
        deleteProductStatus,
        listProduct,
        listProductStatus,
    })
}

export default useProduct