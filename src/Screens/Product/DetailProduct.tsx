import { useParams } from 'react-router-dom'
import PageHeader from '../../common/Components/Pages/PageHeader'
import ScreenTabs from '../../common/Navigation/ScreenTabs/ScreenTabs'
import ProductInformation from './components/ProductInformation'
import ProductVariants from './components/ProductVariants'

const DetailProduct = () => {

  const { id } = useParams()
  
  return (
    <div className='page-container'>
      <PageHeader
        title="Detalle del Producto"
        backNavigation
        submitButton="Editar"
        showSubmitButton={false}
      />
      <ScreenTabs
        basePath={`/product/${id}`}
        tabs={[
          {
            label: 'Información',
            value: 'information',
            component: (
              <ProductInformation id={id}/>
            )
          },
          {
            label: 'Variantes',
            value: 'variants',
            component: (
              <ProductVariants id={id}/>
            )
          }
        ]}
      />
    </div>
  )
}

export default DetailProduct