import { deserialize } from "../../utilities/Object";
export interface IUser {
    user_id: string;
    nickname: string;
    email: string;
    user_metadata: string[];
    blocked: boolean;
}
export class User implements IUser {
    user_id: string = '';
    nickname: string = '';
    email: string = '';
    user_metadata: string[] = [];
    blocked: boolean = false;
    constructor(objData: object) {
        deserialize(objData, this);
    }
}