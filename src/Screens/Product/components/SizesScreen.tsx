import { useMemo, useState} from "react"
import useProductColorSize from "../hooks/ProductColorSizeProvider";
import useSize from "../../Size/hooks/SizeProvider";
import ForeignInput from "../../../common/Components/Inputs/ForeignInput";
import { useFormik } from "formik";
import type { Size } from "../../../common/Interfaces/SizeInterface";

const SizesScreen = ({visible, id}:{visible:boolean, id?:string}) => {
  if(!visible)return null
  const {productColorSizes} = useProductColorSize({id});

  const INIT_VALUES:Size={
    id:'',
    value:''
  }
  //const {data} = useSize(productColorSizes)
  const size_formik=useFormik<Size>({
    initialValues:INIT_VALUES,
    enableReinitialize: true,
    onSubmit:(values)=>{
      console.log('enviado')
    }
  })
  
  return (
    <>
      <div className="grid grid-cols-[auto_auto_auto_auto_auto]">
        <p>Talla</p>
        <p>Precio</p>
        <p>Stock</p>
        <p>Descuento</p>
        <p>Acciones</p>
        <div>
          <ForeignInput
            label=''
            id='id'
            formik={size_formik}
            useQueryProvider={useSize}
          />
        </div>
      </div>
     
    </>
    
  );
};

export default SizesScreen