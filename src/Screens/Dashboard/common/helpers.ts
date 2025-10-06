import type { Order } from "./interfaces";

const peso = (n: number) => Number(n.toFixed(2));

/** Sum money by presentation from details.line_total */
export function buildByPresentationAmount(orders: Order[]) {
    const map = new Map<string, number>();
    for (const o of orders) {
        for (const d of o.details) {
            map.set(d.presentation, (map.get(d.presentation) ?? 0) + d.line_total);
        }
    }
    // Google Chart data: [header..., ...rows]
    // Add an annotation column to show values on bars
    const rows = [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([presentation, amt]) => [presentation, peso(amt), String(peso(amt))]);

    return [["Presentation", "Amount", { role: "annotation" }], ...rows];
}

/** Sum money by driver from order.total */
export function buildByDriverAmount(orders: Order[]) {
    const map = new Map<string, number>();
    for (const o of orders) {
        const key = o.driver || "(Unknown)";
        map.set(key, (map.get(key) ?? 0) + Number(o.total));
    }
    const rows = [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([driver, amt]) => [driver, peso(amt), String(peso(amt))]);

    return [["Driver", "Amount", { role: "annotation" }], ...rows];
}

/** Sum money by customer from order.total */
export function buildByCustomerAmount(orders: Order[]) {
    const map = new Map<string, number>();
    for (const o of orders) {
        const key = o.customer || "(Unknown)";
        map.set(key, (map.get(key) ?? 0) + Number(o.total));
    }
    const rows = [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([customer, amt]) => [customer, peso(amt), String(peso(amt))]);

    return [["Customer", "Amount", { role: "annotation" }], ...rows];
}