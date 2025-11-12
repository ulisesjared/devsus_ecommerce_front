import { useMemo, useState } from "react";
import useGallery from "../hooks/GalleryProvider";
import { Icons } from "../../../common/Constants/Icons";
import AddButton from "../../../common/Components/Buttons/AddButton";
import useProductColor from "../hooks/ProductColorsProvider";
import type { Gallery } from "../../../common/Interfaces/Gallery";
import IconButton from "../../../common/Components/Buttons/IconButton";
import Loader from "../../../common/Components/Loader/Loader";

const GalleryScreen = ({ 
  visible, 
  idProductColor,
  }:{
    visible:boolean, 
    idProductColor:string,
  }) => {

  if (!visible) return null; 
  
  const {createGallery, createGalleryStatus, Gallery, galleryStatus}=useGallery({idProductColor:idProductColor})  
  
  if (!Gallery?.name) {
    return (
    <div className='screen-tab-container flex-1'>
        <div className="p-2 size-full">
            <div className="flex flex-col gap-2 rounded-md shadow-inner size-full bg-slate-50 total-center text-slate-500">
                <Icons.PhotoOff size="32px" />
                <p className="text-sm italic font-semibold ">
                  Aun no hay una galeria para este color
                </p>
                <AddButton className="mt-2"
                  onClick={ async ()=>{
                      const name="gallery "+idProductColor;
                      const data=await createGallery({name:name});
                    }
                  }
                  label="Agregar galeria"
                />
            </div>
        </div>
    </div>
    )
  }
  return (
    galleryStatus === 'pending' ? <Loader message="Cargando galeria..." /> :
    <div className='screen-tab-container'>
        <div className="absolute flex flex-col justify-center w-full gap-2 py-6">
            <h2 className="font-semibold padding-x">
                Fotografías
            </h2>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 padding-x">
                
                <label htmlFor="photo" className="cursor-pointer btn-action-border size-full aspect-square total-center">
                    <IconButton
                        onClick={() =>document.getElementById('photo')?.click()}
                        label="Agregar"
                        Icon={Icons.PhotoPlus}
                        size="sm"
                        className=""
                    />
                    <input
                        onChange={()=>console.log('hola')}
                        type="file"
                        multiple
                        accept="image/*"
                        id="photo"
                        className="hidden"
                    />
                </label>
            </div>
            
        </div>
    </div>
  )
}

export default GalleryScreen;
