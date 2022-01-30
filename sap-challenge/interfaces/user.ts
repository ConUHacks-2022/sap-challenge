export interface IUser {
    id: number,
    email: string,
    name: string,
    address: string,
    phone: string,
    is_admin: boolean,
    create_at?: Date,
    updated_at?: Date,
}