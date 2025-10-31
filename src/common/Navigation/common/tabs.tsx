import { Icons } from "../../Constants/Icons";
import type { ISection, ITab, userRole } from "./interfaces";

export const sectionsByRole: Record<userRole, ISection[]> = {
   SuperUser: [
      {
         value: 'main', label: null, tabs: [
            { label: 'Reportes', to: '/reportes', icon: <Icons.ChartBar size="18px" /> },
            { label: 'Rutas Actuales', to: '/carga', icon: <Icons.Home size="18px" /> },
         ]
      },
      {
         value: 'admin', label: 'Administración', tabs: [
            { label: 'Productos', to: '/product', icon: <Icons.Product size="18px" /> },
            {label: 'Tags', to: '/tag', icon: <Icons.Tag size="18px" /> },
            {label: 'Categorías', to: '/category', icon: <Icons.Category size="18px" /> },
            {label: 'Tallas', to: '/size', icon: <Icons.Size size="18px" /> },
            {label: 'Descuentos', to: '/discount', icon: <Icons.Ticket size="18px" /> },
            {label: 'Colores', to: '/color', icon: <Icons.Color size="18px" /> },
         ]
      }
   ],
   admin: [{
      value: 'admin', label: null, tabs: [
         { label: 'Productos', to: '/producto', icon: <Icons.Product size="18px" /> },
         { label: 'Clientes', to: '/clientes', icon: <Icons.Customer size="18px" /> },
         { label: 'Repartidores', to: '/repartidor', icon: <Icons.Deliver size="18px" /> },
         { label: 'Rutas', to: '/ruta', icon: <Icons.Route size="18px" /> },
      ]
   }],
   driver: [{ value: 'driver', label: null, tabs: [] }]
}

export const bottomTabs: ITab[] = [
   { label: 'Perfil', to: '/profile', icon: <Icons.Profile size="18px" /> },
   { label: 'Cerrar sesión', to: '/logout', icon: <Icons.Logout size="18px" /> },
]