const PANEL_MENU: string = 'PANEL_MENU';
const MODELER: string = 'MODELER';
const VIEWVER: string = 'VIEWVER';

const SAVE: string = 'SAVE';
const UPDATE: string = 'UPDATE';

export { PANEL_MENU, MODELER, VIEWVER, SAVE, UPDATE };

export const ParamsType: Record<string, Record<string, string | Array<string> | Record<string, boolean>>> = {
    '/formularios/disponibles': {
        type: 'instanced',
        params: ['availableLabels', 'availableUsers'],
        actions: { isDelete: false, isEdit: false, isInfo: true, isFill: false, isAssigned: true },
    },
    '/formularios/tareas': {
        type: 'instanced',
        params: ['assignedLabel', 'assignedUser'],
        actions: { isDelete: false, isEdit: false, isInfo: true, isFill: true, isAssigned: false },
    },
    '/formularios/todos': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false, isAssigned: false },
    },
    '/formularios/modelador': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false, isAssigned: false },
    },
    '/formularios': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false, isAssigned: false },
    },
    '/': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false, isAssigned: false },
    },
};
