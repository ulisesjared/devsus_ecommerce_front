import React, { type FC } from 'react'
import { Icons } from '../../Constants/Icons'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './styles.css'

interface ITab {
    label?: string,
    to: string,
    icon: React.ReactNode
}

const TABS: ITab[] = [
    {
        label: 'Principal',
        to: '/principal',
        icon: <Icons.Home size="20px" />
    },
    {
        label: 'Ruta',
        to: '/ruta',
        icon: <Icons.Route size="20px" />
    },
    {
        label: 'Carrito',
        to: '/carrito',
        icon: <Icons.Cart size="20px" />
    },
]

const Tab: FC<{
    tab: ITab
}> = ({ tab }) => {
    const {
        to,
        icon,
        // label
    } = tab
    const resolvedPath = useResolvedPath(to)
    const current = useMatch({ path: resolvedPath.pathname, end: false })

    return (
        <Link to={to} className={`app-bar-tab ${current ? "app-bar-tab-active" : "app-bar-tab-inactive"}`}>
            <div className='flex flex-col items-center size-10 justify-center'>
                {icon}
                {/* <p className='text-xs'>{label}</p> */}
            </div>
        </Link>
    )
}

const DriverAppBar = () => {
    return (
        <div className='w-full h-14 bg-white border-t border-slate-300'>
            <div className='flex flex-row justify-around items-center h-full'>
                {TABS.map((tab) => (
                    <Tab tab={tab} key={tab.to} />
                ))}
            </div>
        </div>
    )
}

export default DriverAppBar