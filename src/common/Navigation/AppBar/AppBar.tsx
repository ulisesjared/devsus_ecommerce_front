import React, { useEffect, useState, type FC } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './AppBar.css'
import Button from '../../Components/Buttons/Button'
import { Icons } from '../../Constants/Icons'
import type { ISection, ITab, userRole } from '../common/interfaces'
import { bottomTabs, sectionsByRole } from '../common/tabs'
import { NavHeader } from './NavHeader'


const Tab: React.FC<{ tab: ITab, isSectionPart: boolean }> = ({ tab, isSectionPart }) => {
   const { to, icon, label } = tab

   const resolvedPath = useResolvedPath(to)
   const current = useMatch({ path: resolvedPath.pathname, end: false })

   return (
      <div className="relative">
         {tab.add &&
            <Link to={tab.add} type="button" className='app-bar-tab-add'>
               <Button tooltip={tab.addToolTip} className="size-full" >
                  <Icons.Add />
               </Button>
            </Link>
         }
         <Link to={to} onClick={() => console.log('blurred')}>
            <div className={`app-bar-tab
            ${isSectionPart ? "app-bar-section-tab" : ""}
            ${current ? "app-bar-tab-active" : "app-bar-tab-inactive"}
            `}>
               <div className='app-bar-tab-icon'>
                  <div className="size-full absolute total-center">
                     {icon}
                  </div>
               </div>
               <div className='app-bar-tab-label app-bar-tab-text'>
                  {label}
               </div>
            </div>
         </Link>
      </div>
   )
}

const SectionHeader: FC<{
   open: boolean,
   toggleOpen: () => void,
   label: string | null

}> = ({ open, toggleOpen, label }) => {
   return (
      <button onClick={toggleOpen} type="button" className='app-bar-tab app-bar-tab-header'>
         <div className="app-bar-tab-icon">
            {open ? <Icons.Up size="17px" /> : <Icons.Down size="17px" />}
         </div>
         <div className='app-bar-tab-label app-bar-tab-text'>
            {label}
         </div>
      </button>
   )
}

const Section: React.FC<ISection> = ({
   // value,
   // icon
   label,
   tabs,
}) => {

   const [open, setOpen] = useState(!label)
   const toggleOpen = () => setOpen((prev) => !prev)

   return (
      <div className='app-bar-section'>
         {label &&
            <SectionHeader
               open={open}
               toggleOpen={toggleOpen}
               label={label}
            />
         }
         {open && tabs.map((tab) => (
            <Tab key={tab.label} tab={tab} isSectionPart={!!label} />
         ))}
      </div>
   )
}

const AppBar: FC<{
   role: userRole
}> = ({ role }) => {

   const [isOpen, setIsOpen] = useState(() => {
      const responsive = window.innerWidth < 765
      if (responsive) return false
      const storedValue = localStorage.getItem('devsus-app-bar-open')
      return storedValue ? JSON.parse(storedValue) : true
   })
   const toggleOpen = () => setIsOpen((prev: boolean) => {
      const newState = !prev
      localStorage.setItem('devsus-app-bar-open', JSON.stringify(newState))
      return newState
   })

   const [sections, setSections] = useState<ISection[]>([])
   useEffect(() => {
      setSections(sectionsByRole[role] ?? [])
   }, [role])

   return (
      <>
         <NavHeader isOpen={isOpen} toggleOpen={toggleOpen} />
         <div className='app-bar-container group/appbar'>
            <div className={`app-bar-slide ${isOpen ? 'open' : ''}`}>

               <div className='py-2 total-center gap-2'>
                  <div className="relative flex-grow total-center">
                     <div className="absolute app-bar-tab-text font-bold text-blue-900">
                        Lacteos Lyly
                     </div>
                  </div>
                  <Button className="w-8 h-10 pt-2 md:size-8 mr-4" onClick={toggleOpen} needsConfirmation={false} tooltip={isOpen ? 'Cerrar barra lateral' : 'Abrir barra lateral'}>
                     {isOpen ? <Icons.CloseSideBar size="20px" /> : <Icons.OpenSideBar size="20px" />}
                  </Button>
               </div>

               <div className='app-bar-tabs-scroll'>
                  <div className='app-bar-tabs'>
                     {sections.map((section) => (
                        <Section {...section} key={section.value} />
                     ))}
                  </div>
               </div>

               <div className={`px-4 py-4 flex flex-col gap-1`}>
                  {bottomTabs.map((tab) => (
                     <Tab key={tab.label} tab={tab} isSectionPart={false} />
                  ))}
               </div>
            </div>
         </div>
      </>
   )
}

export default AppBar