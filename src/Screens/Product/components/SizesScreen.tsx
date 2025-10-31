import { useMemo, useState} from "react"

const SizesScreen = ({visible}:{visible:boolean}) => {
  if(!visible)return null
  
  return (
    <>
      <div className="grid grid-cols-[auto_auto_auto_auto_auto]">
        <p>Talla</p>
        <p>Precio</p>
        <p>Stock</p>
        <p>Descuento</p>
        <p>Acciones</p>
      </div>
      <div>
        
      </div>
    </>
    
  );
};

export default SizesScreen