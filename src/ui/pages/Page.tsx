import React from 'react'
// import ThemeToggler from '../../common/Components/Buttons/ThemeToggler'
import Scroll from '../layout/Scroll'

interface PageProps {
    header: {
        title: string
        allowBackNavigation: boolean
    },
    content: React.ReactNode
}

const Page: React.FC<PageProps> = ({ header, content }) => {
    return (
        <div className='flex flex-col flex-1 w-full content'>
            <div className='flex relative justify-center items-center p-2 w-full text-center shadow-sm content content-border-b'>
                <h1>
                    {header.title}
                </h1>
                <div className="flex absolute top-1/2 flex-row justify-between w-full -translate-y-1/2">
                    {header.allowBackNavigation && (
                        <button className="btn btn-sm-circle btn-ghost">
                            -
                        </button>
                    )}
                    {/* <ThemeToggler /> */}
                </div>
            </div>
            <Scroll>
                {content}
            </Scroll>
        </div>
    )
}



export default Page