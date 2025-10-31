import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { Column } from '../../common/Components/Tables/TableInterface';
import useProduct from './hooks/ProductProvider';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { IProduct } from '../../common/Interfaces/ProductInterface';

export const ProductScreen = () => {
   const { listProduct: products, listProductStatus: productsStatus } = useProduct();
   const navigate = useNavigate();

   const COLUMNS: Column[] = [
      { label: "Nombre", atr: "name", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Descripción", atr: "description", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
   ]

   const SEARCH_KEYS: (keyof IProduct)[] = ["id", "name", "description"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Productos" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/product/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<IProduct>
            theme="light"
            loadingMessage='Cargando productos'
            noDataMessage='No hay productos disponibles'
            data={products ?? []}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={productsStatus === 'pending'}
            handleRowClick={(item) => navigate(`/product/${item.id}`)}
         />

      </div>
   )
}
