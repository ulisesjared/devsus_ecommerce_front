import { useMutation, useQuery } from '@tanstack/react-query'
import { useToast } from '../../../common/hooks/ToastProvider'
import { getErrorMessage } from '../../../common/Constants/functions'
import type { ICart, ITicket } from '../common/interfaces'
import { myAxios } from '../../../common/hooks/useAxios'

const useOrders = ( id?: string) => {

    const { notify } = useToast()

    const CreateOrderMutator = useMutation({
        mutationFn: async (data: ICart) => {
            const res = await myAxios.post('order/', data)
            return res?.data
        },
        onSuccess: () => {
            notify('Orden creada exitosamente')
        },
        onError: (e) => {
            notify(`Error al crear la orden: ${getErrorMessage(e)}`, true)
        }
    })

    const { data: ticketData } = useQuery({
        queryKey: [`order`, id],
        queryFn: async () => {
            const res = await myAxios.get<ITicket>(`order/${id}/`);
            return res.data;
        },
        enabled: !!id,
    });

    return ({
        CreateOrderMutator,
        ticketData
    })
}

export default useOrders