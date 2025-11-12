import { useMemo, useState} from "react"
import useProductColorSize from "../hooks/ProductColorSizeProvider";
import useSize from "../../Size/hooks/SizeProvider";
import ForeignInput from "../../../common/Components/Inputs/ForeignInput";
import { useFormik, getIn } from "formik";
import type { Size } from "../../../common/Interfaces/SizeInterface";
import type { ProductColorSize } from "../../../common/Interfaces/IProductColorSize";
import GridInput from "../../../common/Components/Inputs/GridInput";
import React from 'react';
import GridSelect from "../../../common/Components/Inputs/GridSelect/GridSelect";
import useDiscount from "../../Discount/hooks/DiscountProvider";
import { productColorSizeValidationSchema } from "../common/constants";
import TrashButton from "../../../common/Components/Buttons/TrashButton";
import Button from "../../../common/Components/Buttons/Button";
import type { Sizes } from "../common/constants";

const SizesScreen = ({visible, id}:{visible:boolean, id?:string}) => {
  if(!visible)return null
  const {productColorSizes, createProductColorSize} = useProductColorSize({id});

  const {discounts, DiscountsMap} = useDiscount()
  
  const formik=useFormik<Sizes>({
    initialValues:{
      sizes:productColorSizes ?? []
    },
    validationSchema:productColorSizeValidationSchema,
    enableReinitialize: true,
    onSubmit:(values)=>{
      createProductColorSize(values)
    }
  })

  const defaultProps = {
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  }

  const addNewSize = ()=>{
    formik.setFieldValue('sizes',[...formik.values.sizes, {size:{}, stock:'', price:'', discount:''}])
  }

  const deleteSize = (index:number) => {
    const newList = formik.values.sizes.filter((pcs, i)=>{
      return i != index
    })
    formik.setFieldValue('sizes', newList)
  }

  return (
    <>
      {formik.dirty && <Button onClick={formik.handleSubmit} className='h-10 px-8 btn btn-action '>Guardar</Button>}
      <Button onClick={addNewSize} className='h-10 px-8 btn btn-action '>Nueva talla</Button>
      <div className="grid grid-cols-[auto_auto_auto_auto_auto]">
        <p>Talla</p>
        <p>Precio</p>
        <p>Stock</p>
        <p>Descuento</p>
        <p>Acciones</p>
        {
          formik.values.sizes?.map((pcs,index)=>{

            const sizeTouched=getIn(formik.touched, `sizes[${index}].size`)
            const sizeError=getIn(formik.errors, `sizes[${index}].size`)

            const priceTouched=getIn(formik.touched, `sizes[${index}].price`)
            const priceError=getIn(formik.errors, `sizes[${index}].price`)

            const stockTouched=getIn(formik.touched, `sizes[${index}].stock`)
            const stockError=getIn(formik.errors, `sizes[${index}].stock`)

            const discountTouched=getIn(formik.touched, `sizes[${index}].discount`)
            const discountError=getIn(formik.errors, `sizes[${index}].discount`)

            const rowKey = pcs.id ?? index;
            return (
            <React.Fragment key={rowKey}>  
              <div>
                <ForeignInput
                label=''
                id={`sizes[${index}].size`}
                formik={formik}
                useQueryProvider={useSize}
                /> 
              </div>  
              <div>
                
                <GridInput
                label=""
                id={`sizes.${index}.price`}
                value={formik.values.sizes[index].price+''}
                type="text"
                error={priceTouched && priceError ? priceError : false}
                {...defaultProps}
                />
              </div>
              <div>
                <GridInput
                label=""
                id={`sizes[${index}].stock`}
                value={formik.values.sizes[index].stock+''}
                type="text"
                error={stockTouched && stockError ? stockError : false}
                {...defaultProps}
                />
              </div>
              <div>
                <GridSelect
                  label=""
                  id={`sizes[${index}].discount`}
                  value={formik.values.sizes[index].discount}
                  options={
                    discounts?.map((d)=>{
                      return {label:d.name+' '+d.discount_code, value:d.id}
                    }) ?? []
                  }
                  handleBlur={formik.handleBlur}
                  handleChange={(e:string)=>{formik.setFieldValue(`sizes[${index}].discount`, e)}}
                />
              </div>
              <div>
                <TrashButton
                  // confirmationMessage="Se eliminara de forma permanente este registro"
                  // confirmationTitle="Eliminar la informacion"
                  // confirmationButtonLabel="Eliminar"
                  // confirmationNeeded={true}
                  onPress={()=>{deleteSize(index)}}
                />
              </div>
              
            </React.Fragment>
            )

          })
        }
      </div>
     
    </>
    
  );
};

export default SizesScreen