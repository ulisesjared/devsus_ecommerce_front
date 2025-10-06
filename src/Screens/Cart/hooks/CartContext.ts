import { createContext, useContext } from "react";
import type { FormikProps } from "formik";
import type { ICart, ITicket } from "../common/interfaces";

type CartContextValue = {
  cart: FormikProps<ICart>
  ticketData: ITicket | null
  showTicketModal: boolean
  closeTicketModal: () => void
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within <CartProvider>');
  }
  return ctx;
};