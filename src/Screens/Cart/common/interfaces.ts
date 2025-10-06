
export interface ICartProduct {
    productId: string,
    quantity: number,
}

export interface ICartDetail {
    presentation: string,
    quantity: number,
}

export interface ICart {
    route_detail?: string,
    customer?: string,
    presentations?: { [key: string]: ICartProduct },
    details?: ICartDetail[],
}

/**
 * Ticket interfaces
 */

export interface ITicketDetail {
    presentation: string,
    quantity: number,
    unit_price: string,
    line_total: number
}

export interface ITicket {
    id: string,
    created_at: string,
    customer: string,
    driver: string,
    total: number,
    details: ITicketDetail[]
}