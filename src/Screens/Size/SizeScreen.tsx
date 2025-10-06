import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { Column } from '../../common/Components/Tables/TableInterface';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { Size } from '../../common/Interfaces/SizeInterface';
import useSize from './hooks/SizeProvider';

export const SizeScreen = () => {
   const { sizes, sizesStatus } = useSize();
   const navigate = useNavigate();


   const COLUMNS: Column[] = [
      { label: "Valor", atr: "value", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
   ]

const SEARCH_KEYS: (keyof Size)[] = ["id", "value"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Tallas" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/size/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<Size>
            theme="light"
            loadingMessage='Cargando tallas'
            noDataMessage='No hay tallas disponibles'
            data={sizes ?? []}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={sizesStatus === 'pending'}
            handleRowClick={(item) => navigate(`/size/${item.id}`)}
         />

      </div>
   )
}
