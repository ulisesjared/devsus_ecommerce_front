import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ToastProvider";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../Constants/functions";
import { myAxios } from "./useAxios";

interface WithId {
    id?: string;
}


/**
 * Hook genérico para manejar operaciones CRUD con React Query.
 *
 * @template T - Tipo de datos que extiende `WithId` (debe incluir `id`).
 * @param {string} modulo - Nombre del módulo (por ejemplo, "user", "product", "employee").
 * @param {string} idModulo - Identificador para el setQuery de todos los usuarios, productos etc..
 * @param {string} nameModulo - Nombre descriptivo del módulo (para notificaciones).
 * @param {string} nav - Opcional Ruta de navegación después de una operación (por ejemplo, "/usuarios").
 * @param {string} idName - Opcional Identificador para el setQuery de un solo usuario, producto etc.
 * @param {string} id - Opcional Identificador opcional de un elemento específico, si este es opcional el idName tambien.
 * @param {boolean} isEnabled - Opcional Habilita o deshabilita la consulta (por defecto es true).
 * @returns {object} - Devuelve funciones y datos para CRUD con el módulo.
 */
export const useGenericProvider = <T extends WithId>(
    modulo: string,
    idModulo: string,
    nameModulo: string,
    nav?: string,
    idName?: string,
    id?: string,
    isEnabled: boolean = true,
) => {

    const queryClient = useQueryClient()
    const { notify } = useToast()
    const navigate = useNavigate()

    const get = async (): Promise<T[]> => {
        const res = await myAxios.get<T[]>(`/${modulo}/`);
        return res.data;
    };

    const RecordsQuery = useQuery({
        queryKey: [`${idModulo}`],
        queryFn: get,
        enabled: !id && isEnabled,
    })

    const getOne = async (): Promise<T> => {
        const res = await myAxios.get<T>(`/${modulo}/${id}/`);
        return res.data;
    };

    const getOneGenericQuery = useQuery({
        queryKey: [`${idName}`, id],
        queryFn: getOne,
        enabled: !!id,
    });

    const post = async (data: T): Promise<T> => {
        const res = await myAxios.post(`/${modulo}/`, data)
        return res.data
    }

    const createGenericMutator = useMutation<T, Error, T>({
        mutationFn: post,
        onSuccess: (newGeneric) => {
            queryClient.setQueryData([`${idModulo}`], (oldData: T[]) => [...oldData, newGeneric])
            notify(`Registro de ${nameModulo} creado con éxito`)
            if (nav) navigate(`/${nav}`, {
                replace: true
            })
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
            if (nav) navigate(`/${nav}`, {
                replace: true
            })
        }
    })

    const patch = async (data: T) => {
        const res = await myAxios.patch(`/${modulo}/${data.id}/`, data)
        return res.data
    }

    const updateGenericMutator = useMutation<T, Error, T>({
        mutationFn: patch,
        onSuccess: (updateGeneric) => {
            queryClient.setQueryData([`${idModulo}`], (oldData: T[]) =>
                oldData.map(old => old.id === updateGeneric.id ? updateGeneric : old)
            );
            queryClient.setQueryData([`${idName}`, updateGeneric.id], updateGeneric)
            notify(`Registro de ${nameModulo} editado con éxito`)
            if (nav) navigate(`/${nav}`, {
                replace: true
            })
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
            if (nav) navigate(`/${nav}`, {
                replace: true
            })
        }
    })

    const remove = async () => {
        const res = await myAxios.delete(`/${modulo}/${id}/`)
        return res.data
    }

    const deleteGenericMutator = useMutation<T, Error, string>({
        mutationFn: remove,
        onSuccess: () => {
            queryClient.setQueryData([`${idModulo}`], (oldData: T[]) => oldData.filter(old => old.id !== id))
            queryClient.setQueryData([`${idName}`, id], null)
            if (nav) navigate(`/${nav}`)
            notify(`Registro de ${nameModulo} eliminado con éxito`)
        },
        onError: (error) => {
            notify(getErrorMessage(error), true)
        }
    })

    return ({
        RecordsQuery,
        getOneGenericQuery,
        createGenericMutator,
        updateGenericMutator,
        deleteGenericMutator,
    })
}