import { useQuery } from "@tanstack/react-query"
import { myAxios } from "../../../common/hooks/useAxios"
import type { Column } from "../../../common/Components/Tables/TableInterface"

export interface ICustomerOption {
    id: string,
    name: string,
    address: string
}

export const COLUMNS: Column<ICustomerOption>[] = [
    { label: "Nombre", atr: "name" },
    { label: "Dirección", atr: "address" },
]

const useCustomerOptions = ({ enabled = true }: { enabled?: boolean }) => {

    const {
        data: customerOptions,
        status: customerOptionsStatus
    } = useQuery<ICustomerOption[]>({
        queryKey: ['customers_options'],
        queryFn: async () => {
            const res = await myAxios.get('/customer/options/')
            return res.data
        },
        enabled
    })

    return ({
        customerOptions,
        customerOptionsStatus
    })
}

export default useCustomerOptions