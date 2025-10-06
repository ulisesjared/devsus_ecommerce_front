export interface IRouteItem {
    id: string;
    sequence: number;
}

export interface IRoute {
    id: string;
    name: string;
    description: string;
    customers: IRouteItem[]; 
}
