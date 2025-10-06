import { useEffect, useMemo, useRef, useState } from 'react'
import DriverAppBar from '../../common/Navigation/DriverAppBar/DriverAppBar'
import SlideModal from './components/SlideModal'
import usePresentation from '../Presentation/hooks/PresentationProvider'
import { useParams } from 'react-router-dom'
import InfoCard from '../../common/Components/Cards/InfoCard'
import ProductCard from './components/ProductCard'
import useCustomerPrices from '../Customer/hooks/CustomerPricesProvider'
import { useCart } from './hooks/CartContext'
import LoadingPage from '../../common/Components/Pages/LoadingPage'
import SummaryControls from './components/SummaryControls'
import useMyRoute from '../DriverRoute/hooks/MyRouteProvider'
import { formatCurrency } from '../../common/Constants/functions'
import useCustomerOptions, { COLUMNS } from './hooks/CustomerOptionsProvider'
import ModalSelect from '../../common/Components/Modals/ModalSelect'
import { Icons } from '../../common/Constants/Icons'

const CartScreen = () => {

    /**
     * Viewport height
     */
    const screenRef = useRef<HTMLDivElement>(null)
    const [maxHeight, setMaxHeight] = useState<number>(0)
    useEffect(() => { setMaxHeight(screenRef.current?.clientHeight ?? 0) }, [screenRef])

    /**
     * Logic
     */
    const { route_detail_id } = useParams()
    const [slideOpen, setSlideOpen] = useState(false)

    const { cart } = useCart()
    const { setFieldValue } = cart

    const { customerByRouteDetail } = useMyRoute({})
    const {
        customer,
        customer_name,
        customer_address
    } = customerByRouteDetail[route_detail_id ?? ""] ?? {}

    const {
        presentationsByProduct,
        presentationsStatus,
        presentationsMap
    } = usePresentation()
    const { priceByPresentation } = useCustomerPrices(customer ?? "")

    const { customerOptions } = useCustomerOptions({ enabled: !route_detail_id })
    const selectedCustomer = customerOptions?.find((c) => c.id === cart.values.customer)

    useEffect(() => {
        if (!priceByPresentation || !presentationsMap) return
        const newPresentations = Object.fromEntries(
            Object.entries(priceByPresentation).map(([pId, { target_stock }]) => [
                pId,
                {
                    quantity: target_stock,
                    productId: presentationsMap[pId]?.product ?? ""
                }
            ])
        )
        setFieldValue?.('presentations', newPresentations)
    }, [priceByPresentation, presentationsMap, setFieldValue])

    useEffect(() => {
        if (customer) {
            setFieldValue?.('customer', customer)
        }
    }, [customer, setFieldValue])

    useEffect(() => {
        if (route_detail_id) {
            setFieldValue?.('route_detail', route_detail_id)
        }
    }, [route_detail_id, setFieldValue])

    const total = useMemo(() => (
        Object.entries(cart?.values.presentations ?? {}).reduce((acc, [pId, presentation]) => {
            const price = priceByPresentation[pId]?.price ?? presentationsMap[pId]?.base_price ?? 0
            return acc + (price * presentation.quantity)
        }, 0) ?? 0
    ), [cart?.values, priceByPresentation, presentationsMap])

    return (
        <div className='flex flex-col h-[100dvh] w-full'>
            <div ref={screenRef} className="flex flex-col flex-1 relative">
                {presentationsStatus === 'pending' ? <LoadingPage message='Cargando productos' /> :
                    <div className='size-full flex relative overflow-y-scroll fancy-scroll'>
                        <div className="absolute w-full p-2">
                            <div className='columns-1 sm:columns-2 gap-2'>
                                {Object.entries(presentationsByProduct).map(([productId, p]) =>
                                    <ProductCard
                                        key={productId}
                                        productId={productId}
                                        customerId={customer}
                                        className="w-full mb-2 break-inside-avoid"
                                        presentations={p}
                                        formik={cart}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                }
                <SlideModal
                    disabled={!cart?.isValid}
                    onConfirm={() => cart?.submitForm()}
                    maxHeight={maxHeight}
                    onOpen={() => setSlideOpen(true)}
                    onClose={() => setSlideOpen(false)}
                    buttonLabel='Vender'
                >
                    <div className='flex flex-col flex-1'>
                        <div className='flex-1 relative overflow-y-scroll fancy-scroll'>
                            <div className='absolute w-full p-2 gap-4 flex flex-col'>
                                {route_detail_id ? (
                                    <div>
                                    <p className='font-semibold text-blue-900'>Cliente Seleccionado</p>
                                    <InfoCard className='pl-2'
                                        title={customer_name}
                                        subtitle={customer_address}
                                    />
                                    </div>) : (
                                    <ModalSelect
                                        title='Seleccionar cliente'
                                        placeholder="Selecciona un cliente"
                                        options={customerOptions}
                                        columns={COLUMNS}
                                        onSelect={(option: string) => {
                                            cart.setFieldValue('customer', option)
                                        }}
                                    >
                                        {selectedCustomer &&
                                            <div className='flex flex-col'>
                                                <p className='font-semibold text-blue-900'>Cliente Seleccionado</p>
                                                <div className='flex-1 flex gap-2 items-center'>
                                                    <button
                                                        className='btn btn-primary size-10 total-center'
                                                        onClick={() => cart.setFieldValue('customer', '')}
                                                    >
                                                        <Icons.Close size="26px" />
                                                    </button>
                                                    <InfoCard className='flex-1'
                                                        title={selectedCustomer.name}
                                                        subtitle={selectedCustomer.address}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </ModalSelect>
                                )}
                                {slideOpen && cart.isValid && <div>
                                    <p className='font-semibold text-blue-900'>Detalles de la orden</p>
                                    <SummaryControls
                                        formik={cart}
                                        customerId={customer}
                                    />
                                </div>
                                }
                            </div>
                        </div>
                        <div className=' w-full px-2 flex justify-between items-end'>
                            <p className="font-semibold text-blue-900">Total</p>
                            <p className='font-semibold text-xl'>{formatCurrency(total)}</p>
                        </div>
                    </div>
                </SlideModal>
            </div>
            <DriverAppBar />
        </div >
    )
}

export default CartScreen 