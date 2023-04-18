import { deserialize } from '../../utilities/Object';

export enum StatusForm {
    instanced = 'instanced',
    received = 'received',
}

enum PriorityForm {
    hight = 'hight',
    mediuim = 'mediuim',
    low = 'low',
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
    key?: string;
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
    startProcess: string;
    callbackProcess: string;
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
}

export class Form implements IForm {
    _id?: string = '';
    startProcess: string = '';
    callbackProcess: string = '';
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
        deserialize(objData, this);
    }
}

export interface IFormTemplate {
    _id?: string;
    startProcess: string;
    callbackProcess: string;
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
}

export class FormTemplate implements IFormTemplate {
    _id?: string = '';
    startProcess: string = '';
    callbackProcess: string = '';
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
        deserialize(objData, this);
    }
}
