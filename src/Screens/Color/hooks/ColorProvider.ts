import { useMemo } from "react"
import useGeneric from "../../../common/hooks/Generic"
import type { Color } from "../../../common/Interfaces/ColorInterface"

const useColor = ({ id, enabled = true }: { id?: string, enabled?: boolean }={}) => {

    const {
        list: colors, listStatus: colorsStatus,
        retrieve: color, retrieveStatus: colorStatus,
        create: createColor, createStatus: createColorStatus,
        update: updateColor, updateStatus: updateColorStatus,
        delete: deleteColor, deleteStatus: deleteColorStatus,
    } = useGeneric<Color>({
        module: 'color',
        listQueryKey: 'colors',
        retrieveQueryKey: 'color',
        apiUrl: 'color',
        redirectUrl: 'color',
        objectId: id,
        enabled: enabled,
    })

    const ColorsMap = useMemo(() => (
        Object.fromEntries(colors?.map(t => [t.id, t]) ?? [])
    ), [colors])

    return {
        colors, colorsStatus,
        color, colorStatus,
        createColor, createColorStatus,
        updateColor, updateColorStatus,
        deleteColor, deleteColorStatus,
        ColorsMap
    }
}

export default useColor