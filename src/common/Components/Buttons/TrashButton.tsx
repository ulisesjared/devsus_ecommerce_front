import React from 'react';
import Button from './Button';
import { Icons } from '../../Constants/Icons';

interface TrashButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   message?: string;
   tooltip?: string;
   confirmationNeeded?: boolean;
   confirmationTitle?: string;
   confirmationMessage?: string;
   confirmationButtonLabel?: string;
   onPress: () => void;
}

const TrashButton: React.FC<TrashButtonProps> = ({ className = "",
   message = "",
   tooltip,
   confirmationNeeded,
   confirmationTitle,
   confirmationMessage,
   confirmationButtonLabel,
   onPress,
   ...props

}) => {

   return (<Button
      tooltip={tooltip}
      onClick={onPress}
      needsConfirmation={confirmationNeeded}
      confirmationTitle={confirmationTitle}
      confirmationMessage={confirmationMessage}
      confirmationButtonLabel={confirmationButtonLabel}
      className={`${props.disabled ? "btn-disabled" : "btn-danger"} ${className} gap-2 `}
   >
      <Icons.Trash style={{ height: "65%", width: "auto" }} />
      {message}
   </Button>)

};

export default TrashButton