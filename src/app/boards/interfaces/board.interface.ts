import { IList } from "@/app/lists/interface/list.interface";

export interface IBoard {
    uuid: string;
    title: string;
    lists?: IList[];
 }

export interface ICreateBoard {
    workspaceUUID: string;
    title: FormDataEntryValue | null;
    userUUIDs: string[]
 }