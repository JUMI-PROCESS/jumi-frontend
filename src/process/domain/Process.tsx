import { deserialize } from '../../utilities/Object';

export interface IProcess {
    _id?: string;
    name: string;
    dateRecorded: number;
    dateUpdated: number;
    tenant: string;
    owner: string;
    binary: string;
}

export class Process implements IProcess {
    _id?: string = '';
    name: string = '';
    dateRecorded: number = 0;
    dateUpdated: number = 0;
    tenant: string = '';
    owner: string = '';
    binary: string = '';

    constructor(objData: object) {
        deserialize(objData, this);
    }
}

export interface IDeployment {
    links: string[];
    id: string;
    name: string;
    source: string;
    deploymentTime: string | number;
    tenantId: string;
}

export class Deployment implements IDeployment {
    links: string[] = [];
    id: string = '';
    name: string = '';
    source: string = '';
    deploymentTime: string | number = '';
    tenantId: string = '';

    constructor(objData: object) {
        deserialize(objData, this);
    }
}

export interface IDefinition {
    id: string;
    key: string;
    category: string;
    description: string;
    name: string;
    version: number;
    resource: string;
    deploymentId: string;
    diagram: string;
    suspended: boolean;
    tenantId: string;
    versionTag: string;
    historyTimeToLive: string;
    startableInTasklist: string;
}

export class Definition implements  IDefinition {
    id: string = '';
    key: string = '';
    category: string = '';
    description: string = '';
    name: string = '';
    version: number = 0;
    resource: string = '';
    deploymentId: string = '';
    diagram: string = '';
    suspended: boolean = false;
    tenantId: string = '';
    versionTag: string = '';
    historyTimeToLive: string = '';
    startableInTasklist: string = '';

    constructor(objData: object) {
        deserialize(objData, this);
    }
}

export interface IInstance {
    link: string[];
    id: string;
    definitionId: string;
    businessKey: string;
    caseInstanceId: string;
    ended: boolean;
    suspended: boolean;
    tenantId: string;
}

export class Instance implements IInstance {
    link: string[] = [];
    id: string = '';
    definitionId: string = '';
    businessKey: string = '';
    caseInstanceId: string = '';
    ended: boolean = false;
    suspended: boolean = false;
    tenantId: string = '';

    constructor(objData: object) {
        deserialize(objData, this);
    }
}