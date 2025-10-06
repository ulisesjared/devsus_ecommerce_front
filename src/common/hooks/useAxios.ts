// useAxios.ts
import axios from 'axios';
import mitt from 'mitt';
import { getJson, removeJson, setJson } from '../Storage/storageHelpers';

const HOST = import.meta.env.VITE_BACKEND_HOST;
const STORAGE_KEY = import.meta.env.VITE_SESSION_STORAGE_KEY;

export const authBus = mitt<{
    token: string | null;
}>();

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const subscribe = (cb: (token: string) => void) => queue.push(cb);

// Notifica a todos los suscriptores con el token (o '' si falló el refresh)
const notify = (token: string) => {
    queue.forEach(cb => cb(token));
    queue = [];
};

export const myAxios = axios.create({ baseURL: HOST });

myAxios.interceptors.request.use(async cfg => {
    // Si hay un refresh en curso, espera a que termine
    if (isRefreshing) {
        await new Promise<void>((resolve, reject) => {
            subscribe((token) => {
                // Si el refresh falló, cancelamos esta request tempranamente
                if (!token) return reject(new axios.Cancel('Session expired'));
                resolve();
            });
        });
    }

    // Adjunta el access token actual (si existe)
    const session = getJson(STORAGE_KEY);
    const access = session?.access;
    if (access) cfg.headers.Authorization = `Bearer ${access}`;

    // Content-Type automático para métodos con cuerpo
    if (['post', 'put', 'delete', 'patch'].includes((cfg?.method ?? '').toLowerCase())) {
        if (cfg.data instanceof FormData) {
            cfg.headers['Content-Type'] = 'multipart/form-data';
        } else if (typeof cfg.data === 'object') {
            cfg.headers['Content-Type'] = 'application/json';
        }
    }

    return cfg;
});

myAxios.interceptors.response.use(
    res => res,
    async (err) => {
        const original = err.config as typeof err.config & { _retry?: boolean };
        const status = err?.response?.status;

        // Normaliza la detección del endpoint de refresh
        const isRefreshUrl = (original?.url ?? '').endsWith('/token/refresh/');

        // Condición para NO refrescar
        if (status !== 401 || original?._retry || isRefreshUrl || original?.url === '/logout/') {
            return Promise.reject(err);
        }
        original._retry = true;

        // Si ya hay un refresh en curso, nos encolamos
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribe(token => {
                    // Si el refresh falló, rechazamos sin reintentar
                    if (!token) return reject(err);
                    // Si fue exitoso, reinyectamos token y reintentamos la request original
                    original.headers = { ...original.headers, Authorization: `Bearer ${token}` };
                    resolve(myAxios(original));
                });
            });
        }

        // Ejecutamos el refresh (único líder)
        isRefreshing = true;
        try {
            const session = getJson(STORAGE_KEY);
            if (!session?.refresh) {
                throw new Error('No refresh token');
            }

            const { data } = await axios.post(`${HOST}/token/refresh/`, { refresh: session.refresh });

            // Persistimos los nuevos tokens
            setJson(STORAGE_KEY, { ...session, access: data.access, refresh: data.refresh });

            // Despertamos a la cola con el token nuevo
            notify(data.access);
            authBus.emit('token', data.access);

            // Reinyectamos header y reintentamos la request original
            original.headers = { ...original.headers, Authorization: `Bearer ${data.access}` };
            return myAxios(original);

        } catch (refreshErr) {
            // Orden importante para evitar “carreras”
            removeJson(STORAGE_KEY); // 1) limpiar primero
            notify('');              // 2) desbloquear la cola avisando fracaso
            authBus.emit('token', null);

            // Redirección fuerte que no permite volver con "atrás"
            window.location.replace('/login');

            return Promise.reject(refreshErr);
        } finally {
            isRefreshing = false; // Nunca retornes aquí, solo libera el flag
        }
    }
);
