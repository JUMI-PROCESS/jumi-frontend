import { deserialize } from '../../utilities/Object';

export interface IProcess {
    _id?: string;
    name: string;
    dateRecorded: number;
    dateUpdated: number;
    tenant: string;
    owner: string;
    source: string;
    idCamunda: string;
    rest: Record<string, any>;
}

export class Process implements IProcess {
    _id?: string = '';
    name: string = '';
    dateRecorded: number = 0;
    dateUpdated: number = 0;
    tenant: string = '';
    owner: string = '';
    source: string = '';
    idCamunda: string = '';
    rest: Record<string, any> = {};

    constructor(objData: object) {
        deserialize(objData, this);
    }
}
