const PANEL_MENU: string = 'PANEL_MENU';
const MODELER: string = 'MODELER';
const VIEWVER: string = 'VIEWVER';

const SAVE: string = 'SAVE';
const UPDATE: string = 'UPDATE';

export { PANEL_MENU, MODELER, VIEWVER, SAVE, UPDATE };

export const ParamsType: Record<string, Record<string, string | Array<string> | Record<string, boolean>>> = {
    '/procesos/guardados': {
        type: '',
        params: ['owner'],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos/desplegados': {
        type: '',
        params: [],
        actions: { isDelete: false, isEdit: false, isInfo: true, isFill: true },
    },
    '/procesos/definiciones': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos/instanciados': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos/modelador': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/': {
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
};
