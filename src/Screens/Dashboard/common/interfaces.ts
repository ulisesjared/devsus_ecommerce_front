export interface ReportsProps {
    startDate: Date | string,
    endDate: Date | string
}

export type Order = {
    id: string;
    created_at: string;
    driver: string;
    customer?: string;
    total: string;
    details: Array<{
        presentation: string;
        quantity: number;
        unit_price: string;
        line_total: number;
    }>;
};