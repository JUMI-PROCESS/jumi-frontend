enum StatusForm {
    instanced,
    received
}

enum TypeField {
    text,
    number,
    select,
    date,
    time,
    datetime,
    comment
}

interface IValue {
    value: string;
    multivalue: Array<String>;
}

interface IField {
    _id?: string;
    name: string;
    value?: IValue;
    type: TypeField;
    color: string;
    options: Array<String>;
    isRequired: boolean;
    constraint: string;
    row: number;
    column: number;
    height: number;
    width: number;
}

interface IForm {
    _id?: string;
    name: string,
    rows: number;
    columns: number;
    assigned: Array<string>;
    dateRecord: number;
    dateUpdate: number;
    status: StatusForm;
    tenant: string;
    fields: Array<IField>;
}

export class Form implements IForm {
    _id: string = '';
    name: string = '';
    rows: number = 0;
    columns: number = 0;
    assigned: string[] = [];
    dateRecord: number = 0;
    dateUpdate: number = 0;
    status: StatusForm = StatusForm.instanced;
    tenant: string = '';
    fields: IField[] = [];

    constructor(objData: object) {
        this.deserialize(objData);
    }

    private deserialize(objData: object) {
        const keys = Object.keys(this);
    
    for (const key of keys) {
          if (objData.hasOwnProperty(key)) {
            this[key] = objData[key];
          }
        }
      }
}