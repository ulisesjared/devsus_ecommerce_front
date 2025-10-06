import { useMemo, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "../Loader/Loader";
import ExcelButton from "../Buttons/ExcelButton";
import { exportToExcel } from 'react-json-to-excel';
import { Icons } from "../../Constants/Icons";
import type { TableProps } from "./TableInterface";


const SelectTable = <T extends { id: string }>({
   data = [],
   columns = [],
   unique = "id",
   search = "on",
   searchKeys = [unique],
   handleRowClick = () => { },
   noDataMessage = "No hay datos para mostrar",
   loadingMessage = "Cargando...",
   theme = "dark",
   loading = false,
   setSelectedItems = () => { },
   selectedItems = [],
   multiple = true,
   excelExport = false,
   excelDataFormater = (data) => data,
   excelFileName = new Date().getTime().toString()

}: TableProps<T>) => {

   const [searchText, setSearchText] = useState('');
   const [filter, setFilter] = useState({ atr: unique, ord: 0 });
   const searchRef = useRef<HTMLInputElement>(null);
   const debouncedSearchText = useDebounce(searchText, 500);

   const handleSearchButtonClick = () => {
      if (searchText.length > 0) {
         searchRef?.current?.blur();
         setSearchText("");
         return;
      }
      searchRef?.current?.focus();
   };



   const searchVals = searchText.trim().toLowerCase().split(" ");
   const filteredData = useMemo(() => {
      return data?.filter((d) =>
         searchVals.every((val) =>
            searchKeys.some((key) => d[key] !== null && d[key]?.toString().toLowerCase().includes(val))
         )
      ).sort((a, b) => {
         if (filter.ord === 1) return a[filter.atr] > b[filter.atr] ? 1 : -1;
         if (filter.ord === 2) return a[filter.atr] < b[filter.atr] ? 1 : -1;
         return 1;
      }) || [];

   }, [data, debouncedSearchText, filter]);

   const handleSelectRow = (rowId: string) => {
      setSelectedItems((prevSelected) => {
         if (prevSelected.includes(rowId)) {
            return prevSelected.filter((id) => id !== rowId);
         } else {
            if (!multiple) {
               return [rowId];
            }
            return [...prevSelected, rowId];
         }
      });
   };

   const handleSelectAll = (checked: boolean) => {
      if (checked) {
         const allIds = filteredData.map((item) => item.id);
         setSelectedItems(allIds);
      } else {
         setSelectedItems([]);
      }
   };

   if (loading) {
      return <Loader message={loadingMessage} className="bg-gray-50" />;
   }

   if (!data.length) {
      return (
         <div className="flex items-center justify-center size-full bg-gray-50">
            <p className="text-sm italic text-center text-gray-700">{noDataMessage}</p>
         </div>
      );
   }

   const allVisibleSelected =
      filteredData.length > 0 &&
      filteredData.every((row) => selectedItems.includes(row.id));

   return (
      loading ? (
         <Loader message={loadingMessage} className="bg-slate-50/60" />
      ) : !data.length ? (
         <div className="flex items-center justify-center size-full bg-slate-50 rounded-md shadow-inner">
            <p className="text-sm italic text-center text-gray-700">
               {noDataMessage}
            </p>
         </div >
      ) :
         <div className={`rounded-md shadow-sm relative overflow-scroll fancy-scroll size-full  ${theme === "dark" ? "bg-neutral-900 text-neutral-200" : " bg-slate-50/60"}`}>
            {/* Header */}
            {search === "on" &&
               <div className="sticky left-0 z-10 flex justify-between w-full items-center h-14">
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

            <div
               className={`absolute w-full ${search === "on" ? "top-14" : ""
                  } ${theme === "dark" ? "" : "bg-white"}`}
            >
               <div id="table-container" className={`relative flex w-full`}>
                  <table className={`w-full h-full table-auto`}>
                     <thead className="text-center">
                        <tr className="h-8">
                           {/* Checkbox de "select all" en el encabezado */}
                           <th
                              className={`border-b border-slate-200 sticky top-0 z-10 items-center h-8 px-2 text-sm font-normal cursor-default ${theme === "dark"
                                 ? "bg-gray-950 border-gray-600"
                                 : "bg-slate-50 text-gray-700"
                                 } whitespace-nowrap`}
                           >
                              {multiple && <input
                                 className="cursor-pointer"
                                 type="checkbox"
                                 checked={allVisibleSelected}
                                 onChange={(e) => handleSelectAll(e.target.checked)}
                              />}
                           </th>

                           {columns.map((column, index) => (
                              <th
                                 className={`border-b border-slate-200 sticky top-0 z-10 items-center h-8 px-8 text-sm font-semibold cursor-default ${theme === "dark"
                                    ? "bg-gray-950 border-gray-600"
                                    : "bg-slate-50 text-blue-900"
                                    } whitespace-nowrap group`}
                                 key={index}
                              >
                                 {column.label}
                                 <div
                                    className={`absolute right-0 w-8 h-8 p-1 -translate-y-1/2 top-1/2 ${filter.atr === column.atr && filter.ord !== 0
                                       ? "opacity-100"
                                       : "opacity-0 group-hover:opacity-100"
                                       } duration-100`}
                                 >
                                    <button
                                       type="button"
                                       onClick={() => {
                                          setFilter((prev) => ({
                                             atr: column.atr,
                                             ord:
                                                prev.atr === column.atr
                                                   ? (prev.ord + 1) % 3
                                                   : 1,
                                          }));
                                       }}
                                       className={` h-full w-full flex items-center justify-center`}
                                    >
                                       {filter.atr === column.atr ? (
                                          filter.ord === 1 ? (
                                             <Icons.Down size="18px" />
                                          ) : filter.ord === 2 ? (
                                             <Icons.Up size="18px" />
                                          ) : (
                                             <Icons.Sort size="18px" />
                                          )
                                       ) : (
                                          <Icons.Sort size="18px" />
                                       )}
                                    </button>
                                 </div>
                              </th>
                           ))}
                        </tr>
                     </thead>

                     <tbody>
                        {filteredData.map((row, i) => {
                           // Verificar si el row está seleccionado
                           const isSelected = selectedItems.includes(row.id);
                           return (
                              <tr
                                 key={"R" + i}
                                 onClick={() => {
                                    // Al dar click en la fila, togglear la selección
                                    handleSelectRow(row.id);
                                    // Llamada adicional a handleRowClick
                                    handleRowClick(row);
                                 }}
                                 className={`h-10 duration-150 cursor-pointer ${theme === "dark"
                                    ? isSelected
                                       ? "bg-gray-700"
                                       : "hover:bg-gray-700"
                                    : isSelected
                                       ? "bg-blue-100"
                                       : "hover:bg-slate-100"
                                    } active:opacity-70 active:duration-0 ${i > 0 ? "border-t" : ""} border-slate-200`}
                              >
                                 <td className="sticky px-2">
                                    <div className="total-center">
                                       <input
                                          className="cursor-pointer"
                                          type="checkbox"
                                          onClick={(e) => e.stopPropagation()} // Evitar que el click se propague a la fila
                                          checked={isSelected}
                                          onChange={() => handleSelectRow(row.id)}
                                       />
                                    </div>
                                 </td>
                                 {columns.map((column, j) => (
                                    <td key={j} className="">
                                       <p className="flex items-center h-10 px-8 whitespace-nowrap">
                                          {column.Component ? (
                                             <column.Component data={row[column.atr]} />
                                          ) : (
                                             String(row[column.atr])
                                          )}
                                       </p>
                                    </td>
                                 ))}
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
   );
};

export default SelectTable;
