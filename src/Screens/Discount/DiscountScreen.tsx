import { useNavigate } from 'react-router-dom';
import Table from '../../common/Components/Tables/Table';
import type { Column } from '../../common/Components/Tables/TableInterface';
import useDiscount from './hooks/DiscountProvider';
import AddButton from '../../common/Components/Buttons/AddButton';
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { Discount } from '../../common/Interfaces/DiscountInterface';
//import type { DisplayDiscount } from '../../common/Interfaces/DiscountInterface';

export const DiscountScreen = () => {
   const { discounts, discountsStatus } = useDiscount();
   const navigate = useNavigate();

   

   const COLUMNS: Column[] = [
      { label: "Nombre", atr: "name", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Descripción", atr: "description", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Valor", atr: "value", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Número de usos", atr: "number_of_uses", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Estatus", atr: "is_active", Component: ({data}) => <div className='w-full total-center'>{data? "Activado":"Desactivado"}</div> },
      { label: "Código de descuento", atr: "discount_code", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Tipo de descuento", atr: "discount_type", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
   ]

const SEARCH_KEYS: (keyof Discount)[] = ["id", "name", "description", "value", "number_of_uses", 
   "is_active", "discount_code", "discount_type"];

   return (
      <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Descuentos" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/discount/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<Discount>
            theme="light"
            loadingMessage='Cargando descuentos'
            noDataMessage='No hay descuentos disponibles'
            data={discounts}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={discountsStatus === 'pending'}
            handleRowClick={(item) => navigate(`/discount/${item.id}`)}
         />

      </div>
   )
}
