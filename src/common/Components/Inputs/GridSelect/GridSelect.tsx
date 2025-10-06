import React, { useEffect, useMemo, useRef, useState } from 'react'
import DropModal from '../../Modals/DropModal';
import Loader from '../../Loader/Loader';
import SelectOption from './Option';
import SelectIcon from './Icon';
import type { Option } from '../interfaces/SelectInterface';

const GridSelect: React.FC<{
    id: string,
    label: string,
    value?: string,
    error?: string | false,
    handleChange: (e: string) => void,
    handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    options: Option[],
    loading?: boolean
}> = ({
    id,
    label,
    value,
    error,
    handleChange,
    handleBlur,
    options,
    loading,
    ...props

}) => {

        const selectRef = useRef<HTMLDivElement>(null)
        const inputRef = useRef<HTMLInputElement>(null);

        const [search, setSearch] = useState('')
        const [optionsVisible, setOptionsVisible] = useState(false)
        const [focusIndex, setFocusIndex] = useState(0)

        const handleShowOptions = () => setOptionsVisible(true)
        const handleHideOptions = () => {
            setOptionsVisible(false)
            setSearch('')
            handleSelectIndex(0)
        }

        const handleClear = () => {
            inputRef.current?.focus()
            handleChange('')
            handleSelectIndex(0)
        }

        const handleSelectIndex = (index: number) => {
            setFocusIndex(index)
            const selectedOption = filteredOptions[index];
            selectedOption && document.getElementById(selectedOption.label)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };


        const filteredOptions = useMemo(() => (
            options?.filter(o =>
                value ? o.value !== value : true
            ).filter(o =>
                o?.label?.toLowerCase().includes(search.toLowerCase())
            )
        ), [search, options, value])


        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                const updateFocusIndex = (direction: number) => {
                    const newIndex = (focusIndex + direction + filteredOptions.length) % filteredOptions.length;
                    handleSelectIndex(newIndex);
                };

                if (!optionsVisible) return

                const action: Record<string, () => void> = {
                    'ArrowDown': () => updateFocusIndex(1),
                    'ArrowUp': () => updateFocusIndex(-1),
                    'Escape': () => handleHideOptions(),
                    'Enter': () => {
                        if (filteredOptions[focusIndex]) {
                            handleChange(filteredOptions[focusIndex].value);
                            handleHideOptions();
                        }
                    }
                };

                const actionFunction = action[event.key];

                if (actionFunction) {
                    event.preventDefault();
                    actionFunction();
                }
            };
            document.addEventListener('keydown', handleKeyDown)
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
            }
        }, [focusIndex, filteredOptions, optionsVisible])


        const displayValue = options.find(opt => opt.value === value)?.label

        return (
            <>
                <label id={`label_${id}`} htmlFor={id} className='text-sm text-gray-800 text-right'>{label}</label>

                <div className='flex items-center gap-2 w-full'>
                    <div ref={selectRef} className='relative flex items-center max-w-64'>
                        <input
                            id={id}
                            name={id}
                            readOnly={!!value}
                            ref={inputRef}
                            value={(search || displayValue) ?? ''}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={handleShowOptions}
                            onBlur={(e) => {
                                handleHideOptions()
                                handleBlur?.(e)
                            }}
                            type="text"
                            className={`base-input ${error ? 'input-invalid' : 'input-valid'} w-full`}
                            autoComplete='off'
                            {...props}
                        />
                        <button
                            onFocus={(e) => e.target.blur()}
                            onClick={handleClear}
                            className={`absolute right-2 size-8 btn-primary total-center ${!value ? 'pointer-events-none' : ''}`}
                        >
                            <SelectIcon cancel={!!value} drop={optionsVisible} />
                        </button>
                    </div>
                    {error && <p className='text-xs font-medium text-red-500'>{error.toString()}</p>}
                    <DropModal visible={optionsVisible} ref={selectRef}>
                        <div className='w-64 max-h-[calc(2.5rem*4)] overflow-y-scroll fancy-scroll rounded-md shadow-sm bg-white border border-gray-300'>
                            <div className="">
                                {loading ? <Loader /> : filteredOptions.map((option, i) =>
                                    <SelectOption
                                        focus={i === focusIndex}
                                        key={option.label}
                                        label={option.label}
                                        value={option.value}
                                        component={option.component}
                                        onMouseDown={() => handleChange(option.value)}
                                    />)}
                            </div>
                        </div>
                    </DropModal>
                </div>
            </>
        )
    }


export default GridSelect

