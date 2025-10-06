export interface LoginData {
  email: string;
  password: string;
  recaptcha_token?: string | null;
}

export interface LogoutData {
  refresh: string
}