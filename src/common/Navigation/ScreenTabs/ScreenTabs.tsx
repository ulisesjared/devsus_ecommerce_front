import React from 'react'
import './TabsStyles.css'
import { useNavigate, useParams } from 'react-router-dom'

interface Tabs {
   value: string,
   label: string,
   component: React.ReactNode,
}

interface ScreenTabsProps {
   tabs: Tabs[],
   selected?: string,
   basePath?: string,
}

const ScreenTabs: React.FC<ScreenTabsProps> = ({ tabs, selected, basePath }) => {

   const navigate = useNavigate()
   const { tab = selected ?? tabs[0].value } = useParams()

   const component = tabs.find(t => t.value === tab)?.component

   return (
      <div className='flex flex-1 flex-col'>
         <div className='tabs-container'>
            {tabs.map((t) => (
               <button
                  key={t.value}
                  onClick={() => navigate(`${basePath}/${t.value}`, { replace: true })}
                  className={`tab ${tab === t.value ? 'active' : ''}`}
               >
                  {t.label}
               </button>
            ))}
         </div>
         {component}
      </div>
   )
}

export default ScreenTabs