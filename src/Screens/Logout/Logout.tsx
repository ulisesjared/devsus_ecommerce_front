import { useEffect } from 'react'
import useSession from '../../common/hooks/SessionProvider'
import LoadingPage from '../../common/Components/Pages/LoadingPage'

const LogoutScreen = () => {
    const { logout } = useSession()

    useEffect(() => { logout() }, [logout])

    return (
        <LoadingPage message="Cerrando sesión" />
    )
}

export default LogoutScreen