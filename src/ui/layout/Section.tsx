import React from 'react'

interface SectionProps {
    items: { label: string, value: string | React.ReactNode }[]
    justifyValue?: 'left' | 'center' | 'right'
}

const Section: React.FC<SectionProps> = ({ items, justifyValue = 'left' }) => {
    
    const justifyClass = {
        left: 'text-start',
        center: 'text-center',
        right: 'text-end'
    }

    return (
        <div className={`grid grid-cols-[auto_1fr] gap-x-4 content-border content-bright`}>
            {items.map((item, index) => (
                <div key={index + 1} className={`py-2 px-3 grid grid-cols-subgrid col-span-2 items-center ${index > 0 ? 'content-border-t' : ''}`}>
                    <label>{item.label}:</label>
                    <p className={`${justifyClass[justifyValue]}`}>{item.value}</p>
                </div>
            ))}
        </div>
    )
}

export default Section