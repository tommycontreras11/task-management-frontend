import { ITask } from "@/app/tasks/interfaces/task.interface";

export interface ICreateList {
    title: string;
    boardUUID: string;
}

export interface IList {
    uuid: string;
    title: string;
    boardUUID: string;
    tasks?: ITask[];
}

export interface ITaskList {
    listUUID: string;
    boardUUID: string;
    tasks: ITask[];
}