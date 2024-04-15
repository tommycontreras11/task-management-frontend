export interface IBoard {
    uuid: string;
    title: string;
 }

export interface ICreateBoard {
    workspaceUUID: string;
    title: FormDataEntryValue | null;
    userUUIDs: string[]
 }