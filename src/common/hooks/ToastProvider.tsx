import React, { createContext, useContext, type ReactNode } from 'react';
import { toast, ToastContainer, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
   notify: (message: string, error?: boolean, alert?: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {

   const context = useContext(ToastContext);
   if (!context) {
      throw new Error("useToast debe usarse dentro de un ToastProvider");
   }
   return context
};


export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

   const notify = (message: string, error = false, alert = false) => {
      const options: ToastOptions = {
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         style: { zIndex: 9999 },
      }
      error ? toast.error(message, options) : alert ? toast.warning(message, options) : toast.success(message, options)
   }

   return (
      <ToastContext.Provider value={{
         notify,
      }}>
         {children}
         <ToastContainer />
      </ToastContext.Provider>
   );
};
