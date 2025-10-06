import type { userRole } from "../Navigation/common/interfaces";

export interface User {
  id: string;
  last_login?: string;
  is_superuser?: boolean;
  username?: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
  email: string;
  role: userRole;
  password?: string;
  password_2?: string;
  reset_password?: boolean;
  usuario?: string;
}

