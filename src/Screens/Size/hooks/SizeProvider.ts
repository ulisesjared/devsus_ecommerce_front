import { useMemo } from "react"
import useGeneric from "../../../common/hooks/Generic"
import type { Size } from "../../../common/Interfaces/SizeInterface"


const useSize = () => {

    const {
        list: data, 
        listStatus: status,
        CreateMutator,
        DeleteMutator
    } = useGeneric<Size>({
        module: 'size',
        listQueryKey: 'sizes',
        apiUrl: 'size',
        enabled: true,
    })

    return {
        data,
        CreateMutator,
        DeleteMutator,
        status
    }
}

export default useSize