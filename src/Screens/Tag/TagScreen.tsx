import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { Column } from '../../common/Components/Tables/TableInterface';
import useTag from './hooks/TagProvider';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { Tag } from '../../common/Interfaces/TagInterface';

export const TagScreen = () => {
   const { tags, tagsStatus } = useTag();
   const navigate = useNavigate();


   const COLUMNS: Column[] = [
      { label: "Nombre", atr: "name", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Descripción", atr: "description", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
   ]

const SEARCH_KEYS: (keyof Tag)[] = ["id", "name", "description"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Tags" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/tag/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<Tag>
            theme="light"
            loadingMessage='Cargando tags'
            noDataMessage='No hay tags disponibles'
            data={tags ?? []}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={tagsStatus === 'pending'}
            handleRowClick={(item) => navigate(`/tag/${item.id}`)}
         />

      </div>
   )
}
