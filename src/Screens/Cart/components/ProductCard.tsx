import React from 'react'
import type { IPresentation } from '../../../common/Interfaces/PresentationInterface'
import useUnitMeasure from '../../UnitMeasure/hooks/UnitMeasureProvider'
import type { FormikProps } from 'formik'
import type { ICart } from '../common/interfaces'
import useCustomerPrices from '../../Customer/hooks/CustomerPricesProvider'
import useProduct from '../../Product/hooks/ProductProvider'
import { Icons } from '../../../common/Constants/Icons'
import CountInput from '../../../common/Components/Inputs/CountInput'

interface ProductCardProps {
    productId: string,
    customerId?: string,
    presentations?: IPresentation[],
    formik?: FormikProps<ICart>,
    className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
    productId,
    customerId,
    presentations,
    formik,
    className
}) => {

    const { productsMap } = useProduct()
    const { unitMeasuresMap } = useUnitMeasure()
    const { priceByPresentation } = useCustomerPrices(customerId ?? "")

    return (
        <div className={`bg-white rounded-md shadow-sm px-3 py-2 gap-2 flex flex-col ${className}`}>
            <p className='font-semibold text-lg'>{productsMap[productId]?.name}</p>
            {presentations?.map((p: IPresentation) => (<div key={p.id} className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold'>{p.size}</p>
                        <p className='text-sm text-gray-500'>{Number(p.quantity).toFixed(0)} ({unitMeasuresMap[p.unit_measure]?.abbreviation})</p>
                    </div>
                    <div className='flex gap-4'>
                        <p>
                            ${priceByPresentation[p.id]?.price ?? p.base_price}
                        </p>
                        {Number(priceByPresentation[p.id]?.target_stock) > 0 && <p className='flex gap-2 items-center'>
                            <Icons.Product size="12px" />
                            {Number(priceByPresentation[p.id]?.target_stock)}
                        </p>}
                    </div>
                </div>
                <div>
                    <CountInput
                        id={`presentations.${p.id}.quantity`}
                        formik={formik}
                    />
                </div>
            </div>
            ))}
        </div>
    )
}

export default ProductCard