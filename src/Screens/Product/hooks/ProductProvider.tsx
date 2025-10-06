import { useMemo } from "react";
import { useGenericProvider } from "../../../common/hooks/GenericProvider";

const useProduct = () => {
    const { 
        RecordsQuery,
        createGenericMutator,
        deleteGenericMutator,
    } = useGenericProvider('product', 'Products', "Producto");

    const { data, status } = RecordsQuery;
    const CreateMutator = createGenericMutator
    const DeleteMutator = deleteGenericMutator

    const productsMap = useMemo(() => (
        Object.fromEntries(data?.map(p => [p.id, p]) ?? [])
    ), [data])

    return {
        data, status,
        CreateMutator, DeleteMutator,
        productsMap
    }
}

export default useProduct