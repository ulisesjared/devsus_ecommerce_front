import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSession from './SessionProvider';

const useLastPathNavigate = () => {

    const { session } = useSession()
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            localStorage.setItem("lastPath", pathname);
        }
    }, [pathname, session]);

    useEffect(() => {
        if (session) {
            const lastPath = localStorage.getItem("lastPath") ?? "/login";
            navigate(lastPath, { replace: true });
        }

        return () => {
            localStorage.removeItem("lastPath");
        }
    }, [session, navigate]);
}

export default useLastPathNavigate