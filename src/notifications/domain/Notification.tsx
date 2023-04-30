import { deserialize } from '../../utilities/Object';

export interface INotification {
    _id?: string,
    owner: string,
    title: string,
    message: string,
    isReview: boolean,
    tenant: string,
    dateRecorded: string,
    dateUpdated: string
}

export class Notification_ implements INotification {
    _id?: string = '';
    owner: string = '';
    title: string = '';
    message: string = '';
    isReview: boolean = false;
    tenant: string = '';
    dateRecorded: string = new Date().toISOString();
    dateUpdated: string = new Date().toISOString();

    constructor(objData: object) {
        deserialize(objData, this);
    }
}