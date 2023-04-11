export interface IDeployment {
    _id?: string;
    name: string;
    dateRecorded: number;
    dateUpdated: number;
    tenant: string;
    owner: string;
    idCamunda: string;
    source: string;

    deserialize(objData: object): void;
}

export class Deployment implements IDeployment {
    _id?: string = '';
    name: string = '';
    dateRecorded: number = 0;
    dateUpdated: number = 0;
    tenant: string = '';
    owner: string = '';
    idCamunda: string = '';
    source: string = '';

    constructor(objData: object) {
        this.deserialize(objData);
    }

    deserialize(objData: object): void {
        const keys: string[] = Object.keys(this);

        for (const key of keys) {
            if (objData.hasOwnProperty(key)) {
                type ProcessKey = keyof typeof this;
                type ObjectKey = keyof typeof objData;
                const key_ = key as ProcessKey;
                const keyObject = key as ObjectKey;
                this[key_] = objData[keyObject];
            }
        }
    }
}

export interface IProcess {
    _id?: string;
    name: string;
    dateRecorded: number;
    dateUpdated: number;
    tenant: string;
    owner: string;
    source: string;

    deserialize(objData: object): void;
}

export class Process implements IProcess {
    _id?: string = '';
    name: string = '';
    dateRecorded: number = 0;
    dateUpdated: number = 0;
    tenant: string = '';
    owner: string = '';
    source: string = '';

    constructor(objData: object) {
        this.deserialize(objData);
    }

    deserialize(objData: object): void {
        const keys: string[] = Object.keys(this);

        for (const key of keys) {
            if (objData.hasOwnProperty(key)) {
                type ProcessKey = keyof typeof this;
                type ObjectKey = keyof typeof objData;
                const key_ = key as ProcessKey;
                const keyObject = key as ObjectKey;
                this[key_] = objData[keyObject];
            }
        }
    }
}
