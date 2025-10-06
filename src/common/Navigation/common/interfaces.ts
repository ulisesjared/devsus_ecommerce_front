import type React from "react";

export type userRole = "SuperUser" | "admin" | "driver"

export interface ITab {
    label?: string,
    to: string,
    icon: React.ReactNode,
    add?: string,
    addToolTip?: string
}

export interface ISection {
    value: string,
    label: string | null,
    tabs: ITab[],
    icon?: React.ReactNode;
}

interface IRoute {
    path: string
    element: React.ReactNode
    exact?: boolean
}

export interface IRouteGroup {
    routes: IRoute[],
    showAppBar?: boolean
}