import type { DynamicMaterialProps } from "./interfaces/DynamicMaterialSelect"

const DynamicMaterialSelect: React.FC<DynamicMaterialProps> = ({ id, formik }) => {

   const emptyItem = {
      material: null,
      hebras: "",
      posicion: "",
   }


   const handleAddMaterial = () => {
      formik.setFieldValue(id, [...formik.values[id], emptyItem])
   }

   //console.log(formik?.values[id])

   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Material</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {
                  formik?.values[id]?.map((item: any, i: any) =>

                     <MaterialRow item={item} key={i} />
                  )
               }
            </tbody>
         </table>
         <AddMaterialbutton onClick={handleAddMaterial} />
      </div>
   )
}


const MaterialRow: React.FC<{item: any}> = ({ item }) => {
   return (
      <tr>
         <td>controls</td>
         <td>{item.type}</td>
         <td>controls</td>
      </tr>
   )

}

const AddMaterialbutton: React.FC<{onClick: () => void}> = ({ onClick }) => {
   return (
      <button onClick={onClick} className='w-full h-8 btn-primary'>
         +
      </button>
   )
}


export default DynamicMaterialSelect