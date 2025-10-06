import type { FormikProps } from "formik";

export interface PhoneInputProps {
  id: string;
  label?: string;
  formik: FormikProps<any>;
  [key: string]: any;
}