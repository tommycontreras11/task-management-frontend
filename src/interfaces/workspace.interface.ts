import { IBoard } from "./board.interface";

export interface IWorkspace {
    uuid: string;
    name: string;
    description: string;
    type: string;
    user: Partial<IUser>;
    boards?: Partial<IBoard[]>
}

export interface IUser {
    id: number;
    uuid: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}