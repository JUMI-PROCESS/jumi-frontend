const PANEL_MENU: string = 'PANEL_MENU';
const MODELER: string = 'MODELER';
const VIEWVER: string = 'VIEWVER';

const SAVE: string = 'SAVE';
const UPDATE: string = 'UPDATE';

export { PANEL_MENU, MODELER, VIEWVER, SAVE, UPDATE };

export const ParamsType: Record<string, Record<string, string | Array<string> | Record<string, boolean>>> = {
    '/procesos/guardados': {
        source: 'process',
        type: '',
        params: ['owner'],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos/desplegados': {
        source: 'deployment',
        type: '',
        params: [],
        actions: { isDelete: false, isEdit: false, isInfo: true, isFill: true },
    },
    '/procesos/instanciados': {
        source: 'instance',
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos/modelador': {
        source: '',
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/procesos': {
        source: 'process',
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
    '/': {
        source: 'process',
        type: '',
        params: [],
        actions: { isDelete: true, isEdit: true, isInfo: true, isFill: false },
    },
};
