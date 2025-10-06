import React from 'react'

const SelectOption: React.FC<{
    label: string
    value: string
    focus?: boolean
    component?: React.ReactNode
    // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void

}> = ({ focus, value, label, onMouseDown, component, ...props }) => {
    return (
        <div id={label} style={{ backgroundColor: focus ? '#eff6ff' : 'white' }}>
            <button
                key={value}
                type='button'
                className='w-full px-3 py-2 text-left hover:bg-blue-100'
                onMouseDown={onMouseDown}
                {...props}
            >
                {label}
                {component && component}
            </button>
        </div>
    )
}

export default SelectOption
