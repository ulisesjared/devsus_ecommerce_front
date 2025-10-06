import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../common/Components/Buttons/Button'

const MIN_HEIGHT = 32
const MAX_HEIGHT = 90

interface ISlideModal {
    children: React.ReactNode,
    maxHeight?: number,
    buttonLabel?: string,
    confirmLabel?: string,
    onConfirm?: () => void,
    summary?: React.ReactNode,
    onOpen?: () => void,
    onClose?: () => void,
    disabled?: boolean,
}

const SlideModal: React.FC<ISlideModal> = ({
    maxHeight = 500,
    buttonLabel = 'Continuar',
    confirmLabel = 'Confirmar',
    children,
    onConfirm,
    summary,
    onOpen,
    onClose,
    disabled,
}) => {

    const buttonDragRef = useRef<HTMLButtonElement>(null)

    const [initHeight, setInitHeight] = useState(MIN_HEIGHT)
    const [height, setHeight] = useState(MIN_HEIGHT)
    const [open, setOpen] = useState(false)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        setHeight(open ? MAX_HEIGHT : MIN_HEIGHT)
        if (open) onOpen?.()
        else onClose?.()
    }, [open, onOpen, onClose])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!dragging) return

            const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY
            const percentage = 100 - clientY / maxHeight * 100
            const newHeight = Math.min(Math.max(percentage, MIN_HEIGHT), MAX_HEIGHT)

            setHeight(newHeight)
        }
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('touchmove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('touchmove', handleMouseMove)
        }
    }, [dragging, maxHeight])

    useEffect(() => {
        const handleDragStart = (e: MouseEvent | TouchEvent) => {
            const target = e.target as HTMLElement
            if (buttonDragRef.current?.contains(target)) {
                // console.log('dragging start')
                setInitHeight(height)
                setDragging(true)
            }
        }

        const handleDragEnd = () => {
            if (!dragging) return
            // console.log('dragging end')
            // const open = height > initHeight
            // setOpen(open)
            setOpen(p => !p)
            setDragging(false)
        }

        document.addEventListener('mousedown', handleDragStart)
        document.addEventListener('touchstart', handleDragStart)
        document.addEventListener('mouseup', handleDragEnd)
        document.addEventListener('touchend', handleDragEnd)
        return () => {
            document.removeEventListener('mousedown', handleDragStart)
            document.removeEventListener('touchstart', handleDragStart)
            document.removeEventListener('mouseup', handleDragEnd)
            document.removeEventListener('touchend', handleDragEnd)
        }
    }, [height, initHeight, buttonDragRef, dragging])

    return (<>
        {open && <div className="absolute top-0 size-full bg-black/30 appear" />}
        <div className='sticky bottom-0 w-full'>
            <div
                style={{ height: maxHeight * (height / 100) }}
                className={`bg-white rounded-t-lg flex flex-col border-t border-slate-300
                    ${dragging ? 'transition-none' : 'transition-all duration-300'}`}
            >
                <button ref={buttonDragRef}
                    type='button'
                    className='w-full total-center h-6'>
                    <div className='w-12 h-1 bg-slate-300 rounded-full' />
                </button>
                <div className='flex-1 flex'>
                    {children}
                </div>
                <div className='p-2'>
                    {summary}
                    <Button
                        onClick={() => !open ? setOpen(true) : onConfirm?.()}
                        disabled={disabled}
                        className='btn-action w-full h-12'>
                        {!open ? buttonLabel : confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    </>
    )
}

export default SlideModal