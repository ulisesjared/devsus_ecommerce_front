export interface IDriverLoadDetail {
    id: string;
    driver: string;
    route: string;
    details: ILoadDetails[];
}

export interface IDriverLoad {
    id: string
    driver: string;
    route: string;
    details: ILoadDetailsMap;
}

export interface ILoadDetails {
    presentation: string;
    initial_quantity: number;
}

export interface ILoadDetailsMap {
    [key: string]: ILoadDetails[];
}

export interface IShowLoadInformation extends IDriverLoadDetail {
    next_step?: string;
    progress?: number;
    status?: 'pending' | 'in_progress' | 'finished';
}