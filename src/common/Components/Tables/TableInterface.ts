export interface Column<T = any> {
  atr: keyof T;
  label: string;
  Component?: React.ElementType;
  foot?: boolean;//Al definir esta propiedad se debe implementar tambien el idFoot
  idFoot?: number;
  sticky?: boolean;
}

interface Footer {
  Component?: React.ElementType; // Representa un componente React
}

export interface TableProps<T = any> {
  data?: T[]; // Se define como generico porque puede ser user, employee etc.
  columns: Column<T>[];
  unique?: keyof T;
  search?: "on" | "off";
  searchKeys?: (keyof T)[];
  footers?: Footer[];
  handleRowClick?: (row: T) => void;
  noDataMessage?: string;
  loadingMessage?: string;
  theme?: "dark" | "light";
  loading?: boolean;
  excelExport?: boolean;
  excelDataFormater?: (data: T[], columns: Column[]) => any;
  deleteAction?: boolean;
  allowSelect?: boolean;
  multiple?: boolean;
  selectedItems?: string[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
  excelFileName?: string;
  filters?: { label: string; atr: keyof T; validation: (value: any) => boolean }[];
}

