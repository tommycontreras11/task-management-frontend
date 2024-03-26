export interface IWorkspace {
    uuid: string;
    name: string;
    description: string;
    user: Partial<IUser>;
}

export interface IUser {
    id: number;
    uuid: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}