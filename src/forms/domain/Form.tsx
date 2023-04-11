export enum StatusForm {
    instanced = 'instanced',
    received = 'received',
}

enum PriorityForm {
    hight = 'hight',
    mediuim = 'mediuim',
    low = 'mediuim',
}

enum TypeField {
    text = 'text',
    number = 'number',
    select = 'select',
    date = 'date',
    time = 'time',
    datetime = 'datetime',
    comment = 'comment',
}

export interface IField {
    _id?: string;
    name: string;
    value?: string | number;
    type: TypeField;
    color: string;
    background: string;
    options: Array<String>;
    isRequired: boolean;
    constraint: string;
    gridLocation: {
        row: number;
        column: number;
        height: number;
        width: number;
    };
}

export interface IForm {
    _id?: string;
    rows: number;
    columns: number;
    name: string;
    dateRecorded: number;
    dateUpdated: number;
    status: StatusForm;
    priority: PriorityForm;
    tenant: string;
    availableLabels: Array<string>;
    availableUsers: Array<string>;
    assignedLabel: string;
    assignedUser: string;
    callbackTask: string;
    fields: Array<IField>;

    deserialize(objData: object): void;
}

export class Form implements IForm {
    _id?: string = '';
    rows: number = 0;
    columns: number = 0;
    name: string = '';
    dateRecorded: number = 0;
    dateUpdated: number = 0;
    status: StatusForm = StatusForm.instanced;
    priority: PriorityForm = PriorityForm.low;
    tenant: string = '';
    availableLabels: Array<string> = [];
    availableUsers: Array<string> = [];
    assignedLabel: string = '';
    assignedUser: string = '';
    callbackTask: string = '';
    fields: Array<IField> = [];

    constructor(objData: object) {
        this.deserialize(objData);
    }

    deserialize(objData: object) {
        const keys: string[] = Object.keys(this);

        for (const key of keys) {
            if (objData.hasOwnProperty(key)) {
                type FormKey = keyof typeof this;
                type ObjectKey = keyof typeof objData;
                const key_ = key as FormKey;
                const keyOnject = key as ObjectKey;
                this[key_] = objData[keyOnject];
            }
        }
    }
}
