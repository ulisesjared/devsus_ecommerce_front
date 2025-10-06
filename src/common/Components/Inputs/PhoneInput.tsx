import React from 'react'
import PhoneNumberInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './styles/inputsStyles.css'
import './styles/phoneInputStyles.css'
import type { PhoneInputProps } from './interfaces/PhoneInputInterface'

const PhoneInput: React.FC<PhoneInputProps> = ({ id, label, formik, ...props }) => {

   const { values, setFieldValue, errors, touched, handleBlur } = formik

   const error = (touched[id] && errors[id]) ? errors[id] : null

   return (
      <div className='flex flex-col'>
         <label id={`label_${id}`} htmlFor={id} className='text-sm pb-0.5 text-gray-800'>{label}</label>
         <PhoneNumberInput
            inputStyle={{ paddingLeft: "45px", fontWeight: "500" }}
            buttonStyle={styles.buttonStyle}
            dropdownStyle={{ backgroundColor: "#fff", color: "#000" }}
            // id={id}//Todo: investigar porque las propiedades id, name no eran compatibles
            // name={id}
            onChange={(value) => setFieldValue(id, value)}
            value={values[id]}
            inputProps={{
               id: id,
               name: id,
               className: `base-input ${!error ? 'input-valid' : 'input-invalid'}`,
               onBlur: handleBlur,
            }}
            {...props}
         />
         {error && <p className='text-xs font-medium text-red-500 '>{error.toString()}</p>}
      </div>
   )
}

const styles = {
   buttonStyle: {
      backgroundColor: "#fff",
      borderRadius: "0.375rem",
      border: "0px",
      top: "0.15rem",
      bottom: "0.15rem",
      left: "0.2rem"
   }
}


export default PhoneInput