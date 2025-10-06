import { useMemo } from "react";
import { useGenericProvider } from "../../../common/hooks/GenericProvider";
import type { IDriver } from "../../../common/Interfaces/DriverInterface";


const useDriver = ( id?: string ) => {
    const {
        RecordsQuery,
        getOneGenericQuery,
        createGenericMutator,
        updateGenericMutator,
        deleteGenericMutator
    } = useGenericProvider<IDriver>('driver', 'drivers', "Repartidor", "repartidor", "driver", id);
    const { data: drivers, status: driversStatus } = RecordsQuery;
    const { data: driver, status: driverStatus } = getOneGenericQuery;
    const { mutate: createDriver, status: createDriverStatus } = createGenericMutator
    const { mutate: updateDriver, status: updateDriverStatus } = updateGenericMutator
    const { mutate: deleteDriver, status: deleteDriverStatus } = deleteGenericMutator
    const driversMap = useMemo(() => (
        Object.fromEntries(drivers?.map(p => [p.id, p]) ?? [])
    ), [drivers])

    return {
        drivers, driversStatus,
        driver, driverStatus,
        createDriver, createDriverStatus,
        updateDriver, updateDriverStatus,
        deleteDriver, deleteDriverStatus,
        driversMap
    }
}

export default useDriver;