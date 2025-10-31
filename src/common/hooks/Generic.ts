import {
    useMutation, useQuery,
    //  useQueryClient
} from "@tanstack/react-query"
import { myAxios } from "./useAxios"
import { useToast } from "./ToastProvider"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../Constants/functions"

export interface GenericProps {
    module: string,
    listQueryKey?: string,
    retrieveQueryKey?: string,
    apiUrl: string,
    redirectUrl?: string,
    objectId?: string,
    enabled?: boolean
}

const useGeneric = <T extends { id?: string }>({
    module,
    listQueryKey,
    retrieveQueryKey,
    apiUrl,
    redirectUrl,
    objectId,
    enabled = true

}: GenericProps) => {

    // const queryClient = useQueryClient()
    const { notify } = useToast()
    const navigate = useNavigate()

    const get = async (): Promise<T[]> => {
        const res = await myAxios.get<T[]>(`/${apiUrl}/`);
        return res.data;
    };

    const RecordsQuery = useQuery({
        queryKey: [listQueryKey],
        queryFn: get,
        enabled: !objectId && enabled,
    })

    const retrieve = async (): Promise<T> => {
        const res = await myAxios.get<T>(`/${apiUrl}/${objectId}/`);
        return res.data;
    };
    

    const RetrieveQuery = useQuery({
        queryKey: [retrieveQueryKey, objectId],
        queryFn: retrieve,
        enabled: !!objectId,
    });

    const create = async (data: T): Promise<T> => {
        const res = await myAxios.post(`/${apiUrl}/`, data)
        return res.data
    }

    const CreateMutator = useMutation<T, Error, T>({
        mutationFn: create,
        onSuccess: () => {
            RecordsQuery.refetch()
            // queryClient.setQueryData([`${idModulo}`], (oldData: T[]) => [...oldData, newGeneric])
            notify(`Registro de ${module} creado con éxito`)
            if (redirectUrl) navigate(`/${redirectUrl}`, {
                replace: true
            })
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
            if (redirectUrl) navigate(`/${redirectUrl}`, {
                replace: true
            })
        }
    })

    const partialUpdate = async (data: T) => {
        const res = await myAxios.patch(`/${apiUrl}/${data.id}/`, data)
        return res.data
    }

    const UpdateMutator = useMutation<T, Error, T>({
        mutationFn: partialUpdate,
        onSuccess: () => {

            RecordsQuery.refetch()
            RetrieveQuery.refetch()

            // queryClient.setQueryData([`${idModulo}`], (oldData: T[]) =>
            //     oldData.map(old => old.id === updateGeneric.id ? updateGeneric : old)
            // );
            // queryClient.setQueryData([`${idName}`, updateGeneric.id], updateGeneric)

            notify(`Registro de ${module} editado con éxito`)
            if (redirectUrl) navigate(`/${redirectUrl}`, {
                replace: true
            })
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
            if (redirectUrl) navigate(`/${redirectUrl}`, {
                replace: true
            })
        }
    })

    const remove = async (id?:string) => {
        const paramId = id || objectId
        const res = await myAxios.delete(`/${apiUrl}/${paramId}/`)
        return res.data
    }

    const DeleteMutator = useMutation<T, Error, string | undefined>({
        mutationFn: remove,
        onSuccess: () => {
            RecordsQuery.refetch()

            // queryClient.setQueryData([`${idModulo}`], (oldData: T[]) => oldData.filter(old => old.id !== id))
            // queryClient.setQueryData([`${idName}`, id], null)
            if (redirectUrl) navigate(`/${redirectUrl}`)
            notify(`Registro de ${module} eliminado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })


    return ({
        list: RecordsQuery.data,
        listStatus: RecordsQuery.status,
        refetchList: RecordsQuery.refetch,
        RecordsQuery,
        retrieve: RetrieveQuery.data,
        retrieveStatus: RetrieveQuery.status,
        refetchRetrieve: RetrieveQuery.refetch,
        RetrieveQuery,
        create: CreateMutator.mutate,
        createStatus: CreateMutator.status,
        CreateMutator,
        update: UpdateMutator.mutate,
        updateStatus: UpdateMutator.status,
        UpdateMutator,
        delete: DeleteMutator.mutate,
        deleteStatus: DeleteMutator.status,
        DeleteMutator
    })
}

export default useGeneric