import { type FormikProps } from "formik";

export interface DateInputProps {
    id: string; 
    label: string;
    formik: FormikProps<any>; 
    theme?: 'light' | 'dark'; 
    [key: string]: any; 
  }