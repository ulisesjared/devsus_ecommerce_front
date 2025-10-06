import { useMemo } from "react"
import useGeneric from "../../../common/hooks/Generic"
import type { Discount } from "../../../common/Interfaces/DiscountInterface"

const useDiscount = ({ id, enabled = true }: { id?: string, enabled?: boolean }={}) => {

    const {
        list: discounts, listStatus: discountsStatus,
        retrieve: discount, retrieveStatus: discountStatus,
        create: createDiscount, createStatus: createDiscountStatus,
        update: updateDiscount, updateStatus: updateDiscountStatus,
        delete: deleteDiscount, deleteStatus: deleteDiscountStatus,
    } = useGeneric<Discount>({
        module: 'discount',
        listQueryKey: 'discounts',
        retrieveQueryKey: 'discount',
        apiUrl: 'discount',
        redirectUrl: 'discount',
        objectId: id,
        enabled: enabled,
    })

    const DiscountsMap = useMemo(() => (
        Object.fromEntries(discounts?.map(c => [c.id, c]) ?? [])
    ), [discounts])

    return {
        discounts, discountsStatus,
        discount, discountStatus,
        createDiscount, createDiscountStatus,
        updateDiscount, updateDiscountStatus,
        deleteDiscount, deleteDiscountStatus,
        DiscountsMap
    }
}

export default useDiscount