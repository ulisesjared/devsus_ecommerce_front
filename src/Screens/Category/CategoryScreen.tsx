import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { Column } from '../../common/Components/Tables/TableInterface';
import useCategory from './hooks/CategoryProvider';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { Category } from '../../common/Interfaces/CategoryInterface';

export const CategoryScreen = () => {
   const { categories, categoriesStatus } = useCategory();
   const navigate = useNavigate();


   const COLUMNS: Column[] = [
      { label: "Nombre", atr: "name", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Descripción", atr: "description", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
   ]

const SEARCH_KEYS: (keyof Category)[] = ["id", "name", "description"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Categorías" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/category/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<Category>
            theme="light"
            loadingMessage='Cargando categorías'
            noDataMessage='No hay categorias disponibles'
            data={categories ?? []}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={categoriesStatus === 'pending'}
            handleRowClick={(item) => navigate(`/category/${item.id}`)}
         />

      </div>
   )
}
