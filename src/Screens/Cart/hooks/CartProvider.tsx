import React, { useCallback, useMemo, useState } from "react";
import { useFormik } from "formik";
import type { ICart, ITicket } from "../common/interfaces";
import { CartContext } from "./CartContext";
import useOrders from "./OrdersProvider";
import { useQueryClient } from "@tanstack/react-query";
import TicketModal from "../components/TicketModal";
import { useNavigate } from "react-router-dom";
import { cartValidationSchema } from "../common/validations";

export const CartProvider: React.FC<{
    children: React.ReactNode

}> = ({ children }) => {

    const queryClient = useQueryClient()
    const { CreateOrderMutator } = useOrders()
    const [ticketData, setTicketData] = useState<ITicket | null>(null)
    const [showTicketModal, setShowTicketModal] = useState(false)
    const navigate = useNavigate()
    
    const closeTicketModal = useCallback(() => {
        setShowTicketModal(false)
        navigate('/ruta/pending')
    }, [setShowTicketModal, navigate])

    const cart = useFormik<ICart>({
        initialValues: { route_detail: "", customer: "", presentations: {} },
        validationSchema: cartValidationSchema,
        onSubmit: async (values, helpers) => {
            const fVals = structuredClone(values)
            fVals.details = Object.entries(values.presentations ?? {}).map(([presId, detail]) => ({
                presentation: presId,
                quantity: detail.quantity
            })).filter(d => d.quantity > 0)
            delete fVals.presentations
            if (!fVals.route_detail) delete fVals.route_detail
            if (!fVals.customer) delete fVals.customer

            const res = await CreateOrderMutator.mutateAsync(fVals)
            setTicketData(res)
            setShowTicketModal(true)
            helpers.resetForm()
            queryClient.invalidateQueries({
                predicate: (query) => ['my_route', 'my_progress'].includes(query.queryKey[0] as string)
            })
        },
    });


    const contextData = useMemo(() => ({
        cart,
        ticketData,
        showTicketModal,
        closeTicketModal
    }), [
        cart,
        ticketData,
        showTicketModal,
        closeTicketModal
    ])

    return (
        <CartContext.Provider value={contextData}>
            <TicketModal
                visible={showTicketModal}
                ticketData={ticketData}
                close={closeTicketModal}
            />
            {children}
        </CartContext.Provider>
    );
};
