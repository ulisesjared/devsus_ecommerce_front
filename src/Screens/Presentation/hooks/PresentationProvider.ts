import { useMemo } from "react";
import { useGenericProvider } from "../../../common/hooks/GenericProvider";
import { formatPresentationsByProduct } from "../../Cart/common/funtions";
import type { IPresentation } from "../../../common/Interfaces/PresentationInterface";

const usePresentation = (id?: string) => {
    const {
        RecordsQuery,
        getOneGenericQuery,
        createGenericMutator,
        updateGenericMutator,
        deleteGenericMutator
    } = useGenericProvider<IPresentation>('presentation', 'productos', "Producto", "producto", "producto", id);

    const { data: presentations, status: presentationsStatus } = RecordsQuery;
    const { data: presentation, status: presentationStatus } = getOneGenericQuery;
    const { mutate: createPresentation, status: createPresentationStatus } = createGenericMutator
    const { mutate: updatePresentation, status: updatePresentationStatus } = updateGenericMutator
    const { mutate: deletePresentation, status: deletePresentationStatus } = deleteGenericMutator

    const presentationsMap = useMemo(() => (
        Object.fromEntries(presentations?.map(p => [p.id, p]) ?? [])
    ), [presentations])

    const presentationsByProduct = useMemo(() => (
        formatPresentationsByProduct(presentations ?? [])
    ), [presentations])

    return {
        presentations, presentationsStatus,
        presentation, presentationStatus,
        createPresentation, createPresentationStatus,
        updatePresentation, updatePresentationStatus,
        deletePresentation, deletePresentationStatus,
        presentationsMap,
        presentationsByProduct,
    }
}

export default usePresentation;