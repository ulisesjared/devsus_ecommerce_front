import type { Contact } from '../../../Interfaces/ContactInterface';
import type { Column } from '../../Tables/TableInterface';
export interface DynamicInputProps<T = any> {
    arrayName: string;
    columns: Column<T>[];
    elements: Contact[];
    handleChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
    clearObject: Contact;
}
