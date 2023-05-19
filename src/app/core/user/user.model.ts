export interface UserLogin {
    email: string;
    password: string;
}

export interface User extends UserLogin {
    id: string;
    firstName: string;
    lastName: string;
    phone: number;
    websiteURL: string;
}
