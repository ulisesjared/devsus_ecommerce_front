import Button from "../../../common/Components/Buttons/Button"
import { Icons } from "../../../common/Constants/Icons"
import SelectTable from '../../../common/Components/Tables/SelectTable'
import GenericModal from '../../../common/Components/Modals/GenericModal'
import { useMemo, useState } from "react"
import useColor from "../../Color/hooks/ColorProvider"
import { validationSchemaColors, INIT_VALUES_COLORS } from '../common/constants'
import useProductColor from "../hooks/ProductColorsProvider"
import { useFormik } from "formik"
import ColorItem from "./colorItem"
import type { ProductColors } from "../common/constants"
import type { ProductColor } from "../../../common/Interfaces/ProductColorInterface"
import type { Colors } from "../common/constants"
import ScreenTabs from '../../../common/Navigation/ScreenTabs/ScreenTabs'
import GalleryScreen from "./GalleryScreen"
import SizesScreen from "./SizesScreen"
import TabsBar from "../../../ui/inputs/selectors/TabsBar"


const ProductVariants = ({ id }: { id?: string }) => {

    const [showModal, setShowModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [selectedColor, setSelectedColor] = useState('')
    const [isSizeVisible, setIsSizeVisible] = useState(false)
    const [isGalleryVisible, setIsGalleryVisible] = useState(false)

    const { productColors, createProductColor, deleteProductColor } = useProductColor({ id })
    const { colors, ColorsMap } = useColor()

    const formik = useFormik({
        initialValues: INIT_VALUES_COLORS,
        enableReinitialize: true,
        validationSchema: validationSchemaColors,
        onSubmit: async (values: ProductColors) => {
            createProductColor(values.colors)
        }
    })

    const id_color = useMemo(() => (
        productColors?.map((pc: Colors) => pc.color.id)
    ), [productColors])

    const colorOptions = useMemo(() => (
        colors?.filter(c => !id_color?.includes(c.id)) ?? []
    ), [colors, productColors])


    const newColors = () => {
        const newProductColors: ProductColor[] = selectedItems?.map((s) => ({ color: ColorsMap[s].id, product: id })) ?? []
        formik.setFieldValue('colors', newProductColors)
        formik.handleSubmit()
    }

    return (
        <div className="flex flex-1 p-2 gap-2 bg-white rounded-b-md shadow-md">
            <div className="w-60 flex flex-col gap-2 h-full">
                <GenericModal
                    fullScreen={true}
                    visible={showModal}
                    title="Nuevo Color"
                    content={
                        <div className='flex flex-1 py-2' >
                            <SelectTable theme='light'
                                columns={[
                                    { label: "Nombre", atr: "name", Component: (data) => <p className="w-full total-center">{data.data}</p> },
                                    {
                                        label: "Color", atr: "code_hex", Component: (data) => <p className='w-full total-center'>
                                            <span className="inline-block w-5 h-5 rounded-full border"
                                                style={{ backgroundColor: data?.data }} />
                                        </p>
                                    },
                                ]}
                                data={colorOptions}
                                setSelectedItems={setSelectedItems}
                                selectedItems={selectedItems}
                            />
                        </div>
                    }
                    close={() => setShowModal(false)}
                    actions={[
                        { label: "Cancelar", onClick: () => setShowModal(false) },
                        { label: "Guardar", onClick: () => { setShowModal(false); newColors(); setSelectedItems([]) }, style: 'primary' }
                    ]}
                />
                <div className='flex justify-between items-center w-full'>
                    <p className='pl-2 text-sm font-semibold text-gray-700'>
                        Colores
                    </p>
                    <Button
                        onClick={() => {
                            setShowModal(true)
                        }}

                        className={`h-10 gap-2 btn-action px-4`}
                    >
                        <Icons.Color size="22px" />
                        <p>Nuevo</p>
                    </Button>

                </div>
                <div className="bg-slate-50 rounded-md shadow-inner flex-1 relative overflow-y-scroll fancy-scroll">
                    <div className="absolute flex flex-col gap-2 py-2 pl-2 w-full rounded-md">
                        {
                            productColors?.map((c) => {
                                return (
                                    <ColorItem
                                        value={c.color.name}
                                        color={c.color.code_hex}
                                        key={c.id}
                                        onErrase={() => { deleteProductColor(c.id) }}
                                        onClick={() => {
                                            if (selectedColor === c.color.id) return
                                            setSelectedColor(c.color.id)
                                        }}
                                        focused={selectedColor === c.color.id}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            {
                selectedColor && <div className="flex-1 bg-rose-200">
                    <div className='sm:col-span-2'>
                        <TabsBar tabs={[
                            {
                                value: 'SizesScreen',
                                label: 'Tallas', onClick: () => {
                                    setIsSizeVisible(p=>!p);
                                    setIsGalleryVisible(false)
                                }, isSelected: true
                            },
                            {
                                value: 'GalleryScreen',
                                label: 'Galleria', onClick: () => {
                                    setIsSizeVisible(false);
                                    setIsGalleryVisible(true)
                                }, isSelected: true
                            },
                        ]}
                        />
                        <SizesScreen visible={isSizeVisible} />
                        <GalleryScreen visible={isGalleryVisible} />
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductVariants