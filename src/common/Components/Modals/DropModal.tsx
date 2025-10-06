import { forwardRef, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

interface DropMenuProps {
    visible: boolean;
    children: React.ReactNode;
}

const DropModal = forwardRef<HTMLElement | null, DropMenuProps>(({ visible, children }, ref) => {

    const dropRef = useRef<HTMLDivElement>(null)

    const position = useMemo(() => {

        const { clientWidth, clientHeight } = document.documentElement
        const {
            top: container_top,
            left: container_left,
            bottom: container_bottom,
            right: container_right

        } = (ref as React.MutableRefObject<HTMLElement | null>).current?.getBoundingClientRect() || {}

        const { width: drop_width, height: drop_height } = dropRef.current?.getBoundingClientRect() || {}

        const overflowY = (container_bottom ?? 0) + (drop_height ?? 0) > clientHeight
        const overflowX = (container_left ?? 0) + (drop_width ?? 0) > clientWidth

        let pos: { bottom?: number, top?: number, left?: number, right?: number } = {}

        if (overflowY) { pos.bottom = clientHeight - (container_top ?? 0) }
        else { pos.top = container_bottom }
        if (overflowX) { pos.right = clientWidth - (container_right ?? 0) }
        else { pos.left = container_left }

        return pos

    }, [visible, (ref as React.MutableRefObject<HTMLElement | null>)?.current, dropRef.current])

    return (createPortal(
        <div ref={dropRef} style={{
            position: 'absolute',
            opacity: visible ? '100%' : '0%',
            pointerEvents: visible ? 'all' : 'none',
            // display: visible ? 'block' : 'none',
            ...position,
        }}>

            {children}
        </div>
        , document.body
    )
    )
})

export default DropModal