import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import { useToast } from './ToastProvider';
import type { LoginData } from '../Interfaces/LoginInterface';
import type { SessionInterface } from '../Interfaces/SessionInterface';
import { getErrorMessage } from '../Constants/functions';
import { getJson, removeJson, setJson } from '../Storage/storageHelpers';
import { myAxios } from './useAxios';

const SESSION_KEY = import.meta.env.VITE_SESSION_STORAGE_KEY;

const useSession = () => {

    const queryClient = useQueryClient()
    const { notify } = useToast()
    const navigate = useNavigate()

    const {
        data: session,
        status: sessionStatus
    } = useQuery<SessionInterface | null>({
        queryKey: ["session"],
        queryFn: () => getJson(SESSION_KEY) ?? null,
    })

    const {
        mutate: login,
        status: loginStatus,
    } = useMutation<SessionInterface, Error, LoginData>({
        mutationFn: async (data: LoginData) => {
            const res = await myAxios.post('login/', data)
            return res.data
        },
        onSuccess: (data) => {
            setJson(SESSION_KEY, data)
            queryClient.setQueryData(["session"], data)
            notify(`Bienvenido ${data.user.usuario}`)
            navigate("/panel", { replace: true })
        },
        onError: (error) => {
            notify(`${getErrorMessage(error)}`, true)
        },
    })

    const {
        mutate: logout,
        status: logoutStatus,
    } = useMutation<SessionInterface, Error>({
        mutationFn: async () => {
            const res = await myAxios.post('logout/', { refresh: session?.refresh })
            return res.data
        },
        onSuccess: () => {
            notify(`¡Hasta pronto!`)
        },
        onError: (error) => {
            notify(`${getErrorMessage(error)}`, true)
        },
        onSettled: () => {
            removeJson(SESSION_KEY)
            queryClient.setQueryData(["session"], null)
            navigate(`/login`, { replace: true })
        }
    })

    return ({
        session,
        sessionStatus,
        login,
        loginStatus,
        logout,
        logoutStatus
    })
}

export default useSession