import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import AppBar from './AppBar/AppBar';
import { authRoutes, routesByRole } from './common/routes';
import type { IRouteGroup } from './common/interfaces';
import useSession from '../hooks/SessionProvider';
import useLastPathNavigate from '../hooks/useLastPathNavigate';

const AppRouter = () => {

   const { session } = useSession();
   const { role } = session?.user ?? {}
   const [routes, setRoutes] = useState<IRouteGroup>(authRoutes);

   useLastPathNavigate()
   useEffect(() => {
      setRoutes(role ? routesByRole[role] : authRoutes);
   }, [role]);

   return (
      <div className='flex flex-col sm:flex-row w-full h-[dvh]'>
         {routes?.showAppBar && role && <AppBar role={role} />}
         <Routes>
            {routes?.routes?.map((route) => (
               <Route key={route.path} {...route} />
            ))}
         </Routes>
      </div>
   );
}

export default AppRouter