import { Navigate } from "react-router-dom"
import { Login } from "../../../Screens/Login/Login"
import LogoutScreen from "../../../Screens/Logout/Logout"
import type { IRouteGroup, userRole } from "./interfaces"
import { PresentationScreen } from "../../../Screens/Presentation/PresentationScreen"
import { NewPresentation } from "../../../Screens/Presentation/NewPresentation"
import { DetailPresentation } from "../../../Screens/Presentation/DetailPresentation"
import { ProfileScreen } from "../../../Screens/Profile/ProfileScreen"
/*import CustomersScreen from "../../../Screens/Customer/CustomersScreen"
import NewCustomer from "../../../Screens/Customer/NewCustomer"
import DetailCustomer from "../../../Screens/Customer/DetailCustomer"*/
import { DriverScreen } from "../../../Screens/Driver/DriverScreen"
import { NewDriver } from "../../../Screens/Driver/NewDriver"
import { DetailDriver } from "../../../Screens/Driver/DetailDriver"
/*import { RouteScreen } from "../../../Screens/Route/RouteScreen"
import { NewRoute } from "../../../Screens/Route/NewRoute"
import { DetailRoute } from "../../../Screens/Route/DetailRoute"
import DriverHome from "../../../Screens/DriverHome/DriverHome"
import DriverProfile from "../../../Screens/DriverHome/DriverProfile"
import DriverInventory from "../../../Screens/DriverHome/DriverInventory"
import DriverRoute from "../../../Screens/DriverRoute/DriverRoute"
import CartScreen from "../../../Screens/Cart/CartScreen"*/
import UsersScreen from "../../../Screens/User/UsersScreen"
import NewUserScreen from "../../../Screens/User/NewUserScreen"
import DetailUserScreen from "../../../Screens/User/DetailUserScreen"
/*mport { DriverLoadScreen } from "../../../Screens/DriverLoad/DriverLoadScreen"
import { NewDriverLoad } from "../../../Screens/DriverLoad/NewDriverLoad"*/
import DashBoardScreen from "../../../Screens/Dashboard/DashBoardScreen"
import {NewTag} from "../../../Screens/Tag/NewTag"
import { TagScreen } from "../../../Screens/Tag/TagScreen"
import { DetailTag } from "../../../Screens/Tag/DetailTag"
import {NewCategory} from "../../../Screens/Category/NewCategory"
import {CategoryScreen} from "../../../Screens/Category/CategoryScreen"
import {DetailCategory} from "../../../Screens/Category/DetailCategory"
import {NewSize} from "../../../Screens/Size/NewSize"
import {SizeScreen} from "../../../Screens/Size/SizeScreen"
import {DetailSize} from "../../../Screens/Size/DetailSize"
import {NewDiscount} from "../../../Screens/Discount/NewDiscount"
import {DiscountScreen} from "../../../Screens/Discount/DiscountScreen"
import {DetailDiscount} from "../../../Screens/Discount/DetailDiscount"
import { ColorScreen } from "../../../Screens/Color/ColorScreen"
import { DetailColor } from "../../../Screens/Color/DetailColor"
import {NewColor} from "../../../Screens/Color/NewColor"

export const routesByRole: Record<userRole, IRouteGroup> = {
    SuperUser: {
        routes: [
            { exact: true, path: '*', element: <Navigate to="/profile" /> },
            { path: '/reportes/:tab?', element: <DashBoardScreen /> },
            
            /*{ path: '/carga', element: <DriverLoadScreen /> },
            { path: '/carga/nueva', element: <NewDriverLoad /> },*/

            { path: '/producto', element: <PresentationScreen /> },
            { path: '/producto/nuevo', element: <NewPresentation /> },
            { path: '/producto/:id', element: <DetailPresentation /> },
            
            {path: '/tag/nuevo', element: <NewTag /> },
            {path: '/tag', element: <TagScreen /> },
            {path: '/tag/:id', element: < DetailTag/> },
            
            {path: '/category/:id', element: < DetailCategory/> },
            {path: '/category', element: <CategoryScreen/> },
            {path: '/category/nuevo', element: <NewCategory/> },
            
            {path: '/size/:id', element: < DetailSize/> },
            {path: '/size', element: <SizeScreen/> },
            {path: '/size/nuevo', element: <NewSize/> },
            
            {path: '/discount/:id', element: < DetailDiscount/> },
            {path: '/discount', element: <DiscountScreen/> },
            {path: '/discount/nuevo', element: <NewDiscount/> },
            
            {path: '/color/:id', element: < DetailColor/> },
            {path: '/color', element: <ColorScreen/> },
            {path: '/color/nuevo', element: <NewColor/> },

            /*{ path: '/clientes', element: <CustomersScreen /> },
            { path: '/clientes/nuevo', element: <NewCustomer /> },
            { path: '/clientes/:id/:tab?/', element: <DetailCustomer /> },*/

            { path: '/usuarios', element: <UsersScreen /> },
            { path: '/usuarios/nuevo', element: <NewUserScreen /> },
            { path: '/usuarios/:id', element: <DetailUserScreen /> },

            { path: '/repartidor', element: <DriverScreen /> },
            { path: '/repartidor/nuevo', element: <NewDriver /> },
            { path: '/repartidor/:id', element: <DetailDriver /> },


            /*{ path: '/ruta', element: <RouteScreen /> },
            { path: '/ruta/nueva', element: <NewRoute /> },
            { path: '/ruta/:id', element: <DetailRoute /> },*/

            { path: '/profile', element: <ProfileScreen /> },
            { path: '/logout', element: <LogoutScreen /> },
        ],
        showAppBar: true
    },
    admin: {
        routes: [
            { exact: true, path: '*', element: <Navigate to="/profile" /> },
            { path: '/profile', element: <ProfileScreen /> },
            { path: '/producto', element: <PresentationScreen /> },
            { path: '/producto/nuevo', element: <NewPresentation /> },
            { path: '/producto/:id', element: <DetailPresentation /> },
            /*{ path: '/clientes', element: <CustomersScreen /> },
            { path: '/clientes/nuevo', element: <NewCustomer /> },
            { path: '/clientes/:id/:tab?/', element: <DetailCustomer /> },*/
            { path: '/repartidor', element: <DriverScreen /> },
            { path: '/repartidor/nuevo', element: <NewDriver /> },
            { path: '/repartidor/:id', element: <DetailDriver /> },
            /*{ path: '/ruta', element: <RouteScreen /> },
            { path: '/ruta/nueva', element: <NewRoute /> },
            { path: '/ruta/:id', element: <DetailRoute /> },*/
            { path: '/logout', element: <LogoutScreen /> },],
        showAppBar: true
    },
    driver: {
        routes: [
            { exact: true, path: '*', element: <Navigate to="/principal" /> },
            //{ path: '/principal', element: <DriverHome /> },
            /*{ path: '/perfil', element: <DriverProfile /> },
            { path: '/inventario', element: <DriverInventory /> },
            { path: '/ruta/:tab?/', element: <DriverRoute /> },
            { path: '/carrito', element: <CartScreen /> },*/
            //{ path: '/carrito/:route_detail_id', element: <CartScreen /> },
            { path: '/logout', element: <LogoutScreen /> },
        ],
        showAppBar: false
    }
}

export const authRoutes: IRouteGroup = {
    routes: [
        { exact: true, path: '*', element: <Navigate to="/login" /> },
        { path: '/login', element: <Login /> },
        { path: '/logout', element: <LogoutScreen /> },
    ],
    showAppBar: false
}