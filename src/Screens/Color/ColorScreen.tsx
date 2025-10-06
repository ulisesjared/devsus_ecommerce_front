import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { Column } from '../../common/Components/Tables/TableInterface';
import useColor from './hooks/ColorProvider';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { Color } from '../../common/Interfaces/ColorInterface';

export const ColorScreen = () => {
   const { colors, colorsStatus } = useColor();
   const navigate = useNavigate();


   const COLUMNS: Column[] = [
      { label: "Nombre", atr: "name", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Vista", atr: "code_hex", Component: (data) => <div className='w-full total-center'>
        <span className="inline-block w-5 h-5 rounded-full border"
        style={{ backgroundColor: data?.data }} />
      </div> },
   ]

const SEARCH_KEYS: (keyof Color)[] = ["id", "name", "code_hex"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Colors" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/color/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<Color>
            theme="light"
            loadingMessage='Cargando colores'
            noDataMessage='No hay colores disponibles'
            data={colors ?? []}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={colorsStatus === 'pending'}
            handleRowClick={(item) => navigate(`/color/${item.id}`)}
         />

      </div>
   )
}
