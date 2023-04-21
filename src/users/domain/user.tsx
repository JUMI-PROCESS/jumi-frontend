import { deserialize } from "../../utilities/Object";
export interface IUser {
    user_id: string;
    nickname: string;
    email: string;
    user_metadata: Record<string, any>;
    blocked: boolean;
}
export class User implements IUser {
    user_id: string = '';
    nickname: string = '';
    email: string = '';
    user_metadata: Record<string, any> = {};
    blocked: boolean = false;
    constructor(objData: object) {
        deserialize(objData, this);
    }
}