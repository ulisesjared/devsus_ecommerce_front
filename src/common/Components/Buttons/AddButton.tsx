import React, { forwardRef, useState } from 'react';
import GenericModal from '../Modals/GenericModal';
import { Icons } from '../../Constants/Icons';

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  needsConfirmation?: boolean;
  confirmationTitle?: string;
  confirmationMessage?: string;
}

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(({
  className = "",
  label = "Nuevo",
  disabled = false,
  onClick,
  needsConfirmation = false,
  confirmationTitle = "¿Deseas descartar la información?",
  confirmationMessage = "Se perderá el contenido de forma permanente",
  ...props
}, ref) => {

  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <GenericModal
        visible={showConfirmation}
        title={confirmationTitle}
        content={<div className="p-2 total-center">{confirmationMessage}</div>}
        close={() => setShowConfirmation(false)}
        actions={[
          { label: "Cancelar", onClick: () => setShowConfirmation(false) },
          { label: "Confirmar", onClick: () => { setShowConfirmation(false); onClick && onClick() }, style: 'danger' }
        ]}
      />
      <button
        ref={ref}
        className={`${!disabled ? "btn-action" : "btn-disabled"} flex flex-row items-center gap-1 ${className}`}
        onClick={() => needsConfirmation ? setShowConfirmation(true) : onClick && onClick()}
        {...props}
      >
        <Icons.Add size="18px" />
        <p className='text-sm'>{label}</p>
      </button>
    </>
  );
}
)
export default AddButton