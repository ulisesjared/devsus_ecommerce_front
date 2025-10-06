export interface IUser {
    id?: string
    email: string
    username?: string
    password?: string
    password_2?: string
    is_new?: boolean
    reset_password?: boolean
    role: string
}