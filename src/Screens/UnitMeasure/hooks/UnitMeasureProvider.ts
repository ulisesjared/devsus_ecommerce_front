import { useMemo } from "react"
import { useGenericProvider } from "../../../common/hooks/GenericProvider"
import type { IUnitMeasure } from "../../../common/Interfaces/UnirMeasureInterface";

const useUnitMeasure = () => {
    const { RecordsQuery } = useGenericProvider<IUnitMeasure>('unitMeasure', 'Unit Measures', "Unidad de medida");

    const { data: unitMeasures, status: unitMeasuresStatus } = RecordsQuery;

    const unitMeasuresMap = useMemo(() => (
        Object.fromEntries(unitMeasures?.map(p => [p.id, p]) ?? [])
    ), [unitMeasures])

    return {
        unitMeasures, unitMeasuresStatus,
        unitMeasuresMap
    }
}

export default useUnitMeasure