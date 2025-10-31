import { useMemo, useRef } from "react"
import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import { exportToExcel } from 'react-json-to-excel';
import ExcelButton from "../Buttons/ExcelButton";
import { Icons } from "../../Constants/Icons";
import type { TableProps } from "./TableInterface";
import LoadingPage from "../Pages/LoadingPage";

const Table = <T extends { id: string }>({
   data = [],
   columns = [],
   unique = 'id',
   search = "on",
   searchKeys = [unique],
   //footers = [],
   handleRowClick,
   noDataMessage = "No hay datos para mostrar",
   loadingMessage = "Cargando...",
   theme = "dark",
   loading = false,
   excelExport = false,
   excelDataFormater = (data) => data,
   excelFileName = new Date().getTime().toString(),
   filters = [],
}: TableProps<T>) => {
   const [searchText, setSearchText] = useState('')
   const [filter, setFilter] = useState({ atr: unique, ord: 0 })
   const [selectedFilter, setSelectedFilter] = useState(() => filters.length ? filters[0].label : '')

   const searchRef = useRef<HTMLInputElement>(null);

   const debouncedSearchText = useDebounce(searchText, 500);

   const handleSearchButtonClick = () => {
      if (searchText.length > 0) {
         searchRef?.current?.blur()
         setSearchText('')
         return
      }
      searchRef?.current?.focus()
   }

   const searchVals = searchText.trim().toLowerCase().split(' ')
   const filteredData = useMemo(() => {

      return data?.filter(d =>
         searchVals.every(val =>
            searchKeys.some(key => d[key] !== null && d[key]?.toString().toLowerCase().includes(val))
         ))
         .filter(d => {
            if (!filters.length) return true
            const filterItem = filters.find(f => f.label === selectedFilter)
            if (!filterItem) return true
            return filterItem.validation(d[filterItem.atr])
         })
         .sort((a, b) => {
            if (filter.ord === 1) return a[filter.atr] > b[filter.atr] ? 1 : -1
            if (filter.ord === 2) return a[filter.atr] < b[filter.atr] ? 1 : -1
            return 1;
         })

   }, [data, debouncedSearchText, filter, selectedFilter])


   return (
      loading ? (
         <LoadingPage message={loadingMessage} />
      ) : !data.length ? (
         <div className="flex items-center justify-center size-full bg-slate-50 rounded-md shadow-inner">
            <p className="text-sm italic text-center text-gray-700">
               {noDataMessage}
            </p>
         </div >
      ) :
         <div className={`rounded-md shadow-sm relative overflow-scroll fancy-scroll flex-1  ${theme === "dark" ? "bg-neutral-900 text-neutral-200" : " bg-slate-50/60"}`}>
            {/* Header */}
            {search === "on" &&
               <div className="sticky left-0 z-10 flex justify-between w-full items-center h-14">
                  <div className="flex gap-2 p-2">
                     {filters.map((filter) =>
                        <button key={filter.label}
                           onClick={() => { setSelectedFilter(filter.label) }}
                           className={`tab px-4 h-8 ${selectedFilter === filter.label ? "active" : ""}`}
                        >
                           {filter.label}
                        </button>
                     )}
                  </div>
                  {/* Controls */}
                  <div>
                     {excelExport &&
                        <ExcelButton
                           className="size-8 ml-3"
                           onClick={() => exportToExcel(excelDataFormater(data, columns), excelFileName)}
                        />
                     }
                  </div>
                  {/* Search */}
                  <div className="relative flex items-center ">
                     <input
                        className='base-input-sm pl-3 pr-10 '
                        ref={searchRef}
                        onChange={(e) => { setSearchText(e.target.value) }}
                        value={searchText}
                        type="text"
                        placeholder="Buscar"
                     />
                     <button
                        onClick={handleSearchButtonClick}
                        className='absolute w-6 h-6 right-1 total-center opacity-white rounded-2xl'>
                        {
                           searchText.length > 0 ?
                              <Icons.Close size='18px' style={{ color: '#4b5563' }} /> :
                              <Icons.Search size='13px' style={{ color: '#4b5563' }} />
                        }
                     </button>
                  </div>
               </div>
            }

            <div className={`absolute w-full 
               ${search === 'on' ? "top-14" : ""}`}>
               <div id="table-container" className={`relative flex w-full`}>
                  <table className={`w-full h-full ${theme === 'dark' ? "" : "bg-white"} border-y border-slate-200`}>
                     <thead className='text-center'>
                        <tr className="h-10">
                           {columns.map((column, index) => (
                              <th className={`border-b border-slate-200 sticky -top-0.5 z-10 items-center h-8 px-8 font-semibold text-sm cursor-default ${theme === "dark" ? "bg-neutral-950  border-neutral-600" : "bg-white shadow-sm text-blue-900"} whitespace-nowrap group`} key={index}>
                                 {column.label}
                                 <div className={`absolute right-0 w-8 h-8 p-1 -translate-y-1/2 top-1/2 ${filter.atr === column.atr && filter.ord !== 0 ? "opacity-100" : "opacity-0 group-hover:opacity-100"} duration-100`}>
                                    <button
                                       type="button"
                                       onClick={() => { setFilter(prev => ({ atr: column.atr, ord: (prev.atr === column.atr ? (prev.ord + 1) % 3 : 1) })) }}
                                       className={` h-full w-full flex items-center justify-center`} >
                                       {
                                          filter.atr === column.atr ? (filter.ord === 1 ? <Icons.Up size="18px" /> : (filter.ord === 2 ? <Icons.Down size="18px" /> : <Icons.Sort size="18px" />)) : <Icons.Sort size="18px" />
                                       }
                                    </button>
                                 </div>
                              </th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="w-full bg-white">
                        {filteredData.map((row, i) =>
                           <tr
                              onClick={() => handleRowClick && handleRowClick(row)}
                              className={`h-10 w-full duration-150 cursor-pointer ${theme === "dark" ? "hover:bg-neutral-700" : "hover:bg-slate-100"} active:opacity-70 active:duration-0 ${i > 0 ? "border-t" : ""} border-slate-200`}
                              key={"R" + i}>
                              {/*<td className="sticky px-2">
                                    <input
                                    readOnly checked={row?.isSelected | false} className="pointer-events-none" type="checkbox" />
                                 </td>*/
                              }
                              {columns.map((column, j) =>
                                 <td key={j} className={`${column.sticky ? 'sticky right-0' : ''}`}>
                                    <div className="flex items-center px-8 whitespace-nowrap">
                                       {column.Component ?
                                          <column.Component data={row[column.atr]} /> : <>
                                             {String(row[column.atr])}
                                          </>
                                       }
                                    </div>
                                 </td>
                              )}
                           </tr>
                        )}

                     </tbody>
                     {/* {footers && <tfoot className="sticky bottom-0 ">
                        <tr className="h-8 ">
                           {columns.map((column, index) => {
                              const FootComponent = column.foot && footers[column.idFoot!] && footers[column.idFoot!]?.Component
                              return (
                                 <td key={`TF_${index}`} className="font-medium text-center">
                                    {column.foot && (
                                       FootComponent ?
                                          <FootComponent
                                             data={footers[column.idFoot!]}
                                          />
                                          :
                                          footers[column.idFoot!]
                                    )}
                                 </td>
                              )
                           })}
                        </tr>
                     </tfoot>} */}
                  </table>
               </div>
            </div>
         </div>
   )
}

export default Table