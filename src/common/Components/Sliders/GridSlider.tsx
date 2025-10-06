import React, { type FC, useMemo, useRef, useState } from 'react'
import './slidersStyles.css'
import SelectTable from '../Tables/SelectTable';
import Loader from '../Loader/Loader';
import Button from '../Buttons/Button';
import { Icons } from '../../Constants/Icons';
import type { Column } from '../Tables/TableInterface';

interface SliderProps {
    height?: number,
    addButtonContent?: React.ReactNode,
    addButtonTooltip?: string,
    filters?: { key: string; value: string }[],
    searchKeys?: string[],
    options: any[] | undefined,
    selected: any[]
    setSelected: (selected: string[]) => void,
    columns: Column<any>[],
    children: React.ReactNode,
    loading?: boolean
}

const GridSliderComponent: FC<SliderProps> = ({
    height = 208,
    addButtonContent = <Icons.Add />,
    addButtonTooltip = 'Agregar',
    filters = [],
    searchKeys = [],
    options,
    selected,
    setSelected,
    columns,
    children,
    loading = false,
}) => {
    const addBtnRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const [internalSelected, setInternalSelected] = useState<string[]>([])
    // TODO: Implement filter
    const [selectedFilter] = useState(filters.length > 0 ? filters[0] : null)
    const [searchText, setSearchText] = useState('')

    const toggleSlider = () => {
        setIsOpen((prev) => !prev)
        addBtnRef.current?.classList.toggle('open')
        setInternalSelected([])
        setSearchText('')
    }

    const handleSelectItems = () => {
        setSelected([...selected, ...internalSelected])
        toggleSlider()
    }

    const filteredOptions = useMemo(() => {
        const searchVals = searchText.trim().toLowerCase().split(' ')
        return (
            options?.filter((option) =>
                selected?.length === 0 ? true : !selected?.includes(option.id)
            ).filter((option) =>
                selectedFilter ? option[selectedFilter.key] === selectedFilter.value : true
            ).filter((option) =>
                searchVals.every((val) =>
                    searchKeys.some((key) =>
                        option[key] !== null && option[key]?.toString().toLowerCase().includes(val)
                    )
                )
            ) || []
        )
    }, [options, searchText, selectedFilter, selected])


    return (
        <div className='col-span-2 flex gap-2 relative'>

            <div ref={addBtnRef} className='open add-btn'>
                <Button
                    tooltip={addButtonTooltip}
                    onClick={toggleSlider}
                    className='size-full btn-action-border'
                >
                    {addButtonContent}
                </Button>
            </div>


            <div style={{ width: isOpen ? `50%` : '2.5rem', height: `${height}px` }} className='slider'>
                {
                    isOpen && <div className='appear appear-delay h-full bg-white border rounded-md overflow-hidden shadow-sm'>
                        <div className='flex flex-col h-full'>
                            <div className='flex gap-2 h-10 p-1'>
                                <button onClick={toggleSlider} className='btn-primary size-8 total-center'>
                                    <Icons.Close size="22px" />
                                </button>
                                {/* TODO: Implement filter */}
                                <input
                                    maxLength={100}
                                    type="text"
                                    className='flex-1 base-input-sm w-full'
                                    placeholder='Buscar...'
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <button
                                    disabled={internalSelected.length === 0}
                                    onClick={handleSelectItems}
                                    className='btn-action size-8 total-center'>
                                    <Icons.Right size="23px" />
                                </button>
                            </div>
                            <div className='flex flex-1'>
                                {loading ? <Loader /> :
                                    <SelectTable
                                        data={filteredOptions}
                                        columns={columns}
                                        search='off'
                                        theme="light"
                                        selectedItems={internalSelected}
                                        setSelectedItems={setInternalSelected}
                                    />}
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div style={{ width: isOpen ? `50%` : '100%', height: `${height}px` }} className='slider'>
                <div className='bg-slate-50 shadow-inner h-full relative overflow-y-scroll rounded-md fancy-scroll'>
                    <div className="absolute w-full">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export const GridSlider = React.memo(GridSliderComponent);