import type { User } from "./UserInterface";

export interface SessionInterface {
    access: string;
    refresh: string;
    user: User;
}