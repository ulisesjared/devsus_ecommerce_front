import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { myAxios } from "../../../common/hooks/useAxios"
import { getErrorMessage } from "../../../common/Constants/functions"
import { useToast } from "../../../common/hooks/ToastProvider"
import type { Gallery } from "../../../common/Interfaces/Gallery"

const useGallery = ({id,idProductColor, enabled=true}:{id?:string,idProductColor?:string, enabled?:boolean}={}) => {
    const { notify } = useToast()
    const qc = useQueryClient()

    

    const{ 
        mutateAsync: createGallery,
        status: createGalleryStatus
    } = useMutation({
        mutationFn: async (data: Gallery) => {
            const res = await myAxios.post(`product_color/${idProductColor}/create_gallery/`, data)
            qc.invalidateQueries({queryKey:['gallery', idProductColor] })
            return res.data
        },
        onSuccess: () => {
            notify(`Galeria creada con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })

    const { 
        data:Gallery, 
        status:galleryStatus
    } = useQuery<Gallery>({
    
    queryKey: ['gallery', idProductColor],
    
    queryFn: async () => {
      const res = await myAxios.get(`product_color/${idProductColor}/get_gallery`);
      return res.data; 
    },
    enabled: !!idProductColor,
  });
    return({
        createGallery,
        createGalleryStatus,
        Gallery, 
        galleryStatus   
    })
}

export default useGallery