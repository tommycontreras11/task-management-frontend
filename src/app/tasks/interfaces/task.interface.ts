import { PriorityTaskStatus } from "@/utils/enum";

export interface ICreateTask {
    listUUID: string;
    title: string;
    description?: string;
    priority?: PriorityTaskStatus
    dueDate?: Date
}

export interface ITask {
    uuid: string;
    title: string;
    description: string;
}