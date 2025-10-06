import usePresentation from './hooks/PresentationProvider'
import PageHeader from '../../common/Components/Pages/PageHeader';
import type { IPresentation } from '../../common/Interfaces/PresentationInterface';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../common/Components/Buttons/AddButton';
import type { Column } from '../../common/Components/Tables/TableInterface';
import Table from '../../common/Components/Tables/Table';
import useProduct from '../Product/hooks/ProductProvider';
import useUnitMeasure from '../UnitMeasure/hooks/UnitMeasureProvider';
import { formatCurrency } from '../../common/Constants/functions';
import { useMemo } from 'react';

export const PresentationScreen = () => {

    const { presentations, presentationsStatus } = usePresentation();
    const { productsMap, status } = useProduct();
    const { unitMeasuresMap, unitMeasuresStatus } = useUnitMeasure();
    const navigate = useNavigate();
    const  formattedPresentations = useMemo(() => presentations?.map(p => ({
        ...p,
        quantity: p.quantity + ' ' + unitMeasuresMap[p.unit_measure ?? '']?.abbreviation,
    })) ?? [], [presentations, unitMeasuresMap]);

    const COLUMNS: Column[] = [
      { label: "Producto", atr: "product", Component: (data) => <div className='w-full total-center'>{productsMap[data.data].name ?? ''}</div> },
      { label: "Tamaño", atr: "size", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
      { label: "Cantidad", atr: "quantity", Component: (data) => <div className='w-full total-center'>{data.data}(s)</div> },
      { label: "Precio base", atr: "base_price", Component: (data) => <div className='w-full total-center'>{formatCurrency(data.data)}</div> },
   ]


   const SEARCH_KEYS: (keyof IPresentation)[] = ["id", "size", "quantity", "product", "base_price", "base_price"];

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>

         <PageHeader title="Productos" />

         <div className='flex flex-row gap-2'>
            <AddButton
               onClick={() => navigate('/producto/nuevo')}
               label="Nuevo"
               className="px-4 py-2" />
         </div>

         <Table<IPresentation>
            theme="light"
            loadingMessage='Cargando productos'
            noDataMessage='No hay productos disponibles'
            data={formattedPresentations!}
            columns={COLUMNS}
            searchKeys={SEARCH_KEYS}
            loading={[presentationsStatus, status, unitMeasuresStatus].includes('pending')}
            handleRowClick={(item) => navigate(`/producto/${item.id}`)}
         />

      </div>
    )
}