import React from 'react'

interface ScrollProps {
    children: React.ReactNode
    direction?: 'vertical' | 'horizontal'
    padding?: number
    gap?: number
}

const Scroll: React.FC<ScrollProps> = ({ children, direction = 'vertical', padding = 2, gap = 2 }) => {

    const scrollDirection = direction === 'vertical' ? 'overflow-y-scroll' : 'overflow-x-scroll'

    return (
        <div className={`flex-1 ${scrollDirection} relative fancy-scroll`}>
            <div className='absolute w-full'>
                <div className={`flex flex-col gap-${gap} p-${padding}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Scroll