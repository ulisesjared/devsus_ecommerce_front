export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  tooltip?: string;
  scaning?: boolean | null;
  onClick?: () => void;
  needsConfirmation?: boolean;
  confirmationTitle?: string;
  confirmationMessage?: string;
  confirmationContent?: React.ReactNode;
  confirmationButtonLabel?: string;
  confirmationButtonStyle?: 'primary' | 'secondary' | 'danger' |'action';
  cancelButtonLabel?: string;
}