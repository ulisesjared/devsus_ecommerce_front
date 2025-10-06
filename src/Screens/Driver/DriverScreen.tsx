import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { IDriver } from '../../common/Interfaces/DriverInterface';
import type { Column } from '../../common/Components/Tables/TableInterface';
import useDriver from './hooks/DriverProvider';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';

export const DriverScreen = () => {
   const { drivers, driversStatus } = useDriver();
   const navigate = useNavigate();

   const COLUMNS: Column[] = [
      { label: "Nombre", atr: "name", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Telefono", atr: "phone", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
   ]

   const SEARCH_KEYS: (keyof IDriver)[] = ["id", "name", "phone"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Repartidores" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/repartidor/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<IDriver>
            theme="light"
            loadingMessage='Cargando repartidores'
            noDataMessage='No hay repartidores disponibles'
            data={drivers ?? []}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={driversStatus === 'pending'}
            handleRowClick={(item) => navigate(`/repartidor/${item.id}`)}
         />

      </div>
   )
}
