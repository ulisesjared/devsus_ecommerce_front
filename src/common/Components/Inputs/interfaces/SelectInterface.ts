import type { FormikProps } from "formik";
import React from "react";

export interface Option {
    label: string
    value: string
    component?: React.ReactNode
    focus?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface SelectProps {
    id: string;
    label: string;
    formik: FormikProps<any>;
    options: Option[];
    loading?: boolean;
    [key: string]: any;
}

export interface SelectScannerProps extends SelectProps {
    value: string
    Icon: React.ElementType<{ className?: string; size?: string | number }>;
    fieldChange?: (value: boolean) => void;
    space: string
    unique: string
    disabled: string
    props: string
} 