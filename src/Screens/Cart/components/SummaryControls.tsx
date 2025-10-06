import React from 'react'
import type { FormikProps } from 'formik'
import type { ICart } from '../common/interfaces'
import usePresentation from '../../Presentation/hooks/PresentationProvider'
import CountInput from '../../../common/Components/Inputs/CountInput'
import useProduct from '../../Product/hooks/ProductProvider'
import useUnitMeasure from '../../UnitMeasure/hooks/UnitMeasureProvider'
import useCustomerPrices from '../../Customer/hooks/CustomerPricesProvider'
import { formatCurrency } from '../../../common/Constants/functions'


interface ISummaryControls {
    formik?: FormikProps<ICart>,
    customerId?: string
}

const SummaryControls: React.FC<ISummaryControls> = ({ formik, customerId }) => {

    const { productsMap } = useProduct()
    const { presentationsMap } = usePresentation()
    const { unitMeasuresMap } = useUnitMeasure()
    const { priceByPresentation } = useCustomerPrices(customerId ?? "")

    return (
        <div className='gap-2 grid grid-cols-[6rem,auto,auto,auto]'>
            {Object.entries(formik?.values.presentations ?? {}).map(([presentationId, p]) => {

                if (p.quantity === 0) return

                const {
                    product,
                    quantity,
                    unit_measure,
                    base_price
                } = presentationsMap[presentationId]

                return (
                    <div key={presentationId} className='grid col-span-4 grid-cols-subgrid items-center justify-between '>
                        <CountInput
                            id={`presentations.${presentationId}.quantity`}
                            formik={formik}
                        />
                        <div className='flex flex-col  items-start whitespace-nowrap'>
                            <p>{productsMap[product]?.name}</p>
                            <p className='text-sm text-gray-500'>{Number(quantity).toFixed(0)} ({unitMeasuresMap[unit_measure]?.abbreviation})</p>
                        </div>
                        <div>
                            <p>
                                {formatCurrency(priceByPresentation[presentationId]?.price ?? base_price)}
                            </p>
                        </div>
                        <div>
                            <p>
                                {formatCurrency((priceByPresentation[presentationId]?.price ?? base_price) * p.quantity)}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SummaryControls