import { useMemo } from "react"
import useGeneric from "../../../common/hooks/Generic"
import type { Size } from "../../../common/Interfaces/SizeInterface"

const useSize = ({ id, enabled = true }: { id?: string, enabled?: boolean }={}) => {

    const {
        list: sizes, listStatus: sizesStatus,
        retrieve: size, retrieveStatus: sizeStatus,
        create: createSize, createStatus: createSizeStatus,
        update: updateSize, updateStatus: updateSizeStatus,
        delete: deleteSize, deleteStatus: deleteSizeStatus,
    } = useGeneric<Size>({
        module: 'size',
        listQueryKey: 'sizes',
        retrieveQueryKey: 'size',
        apiUrl: 'size',
        redirectUrl: 'size',
        objectId: id,
        enabled: enabled,
    })

    const SizesMap = useMemo(() => (
        Object.fromEntries(sizes?.map(s => [s.id, s]) ?? [])
    ), [sizes])

    return {
        sizes, sizesStatus,
        size, sizeStatus,
        createSize, createSizeStatus,
        updateSize, updateSizeStatus,
        deleteSize, deleteSizeStatus,
        SizesMap
    }
}

export default useSize