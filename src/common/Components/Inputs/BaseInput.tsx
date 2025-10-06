import React from 'react'
import './styles/inputsStyles.css'

const BaseInput: React.FC<{error: boolean}> = ({ error = false }) => {
   return (
      <input className={`base-input ${error ? "input-invalid" : "input-valid"}`} />
   )
}

export default BaseInput