export default {
    fields: [
        {
            _id: 'template1',
            name: 'Texto',
            key: '',
            type: 'text',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 1,
                column: 1,
                height: 2,
                width: 2,
            },
        },
        {
            _id: 'template2',
            name: 'Númerico',
            key: '',
            type: 'number',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 2,
                column: 1,
                height: 3,
                width: 2,
            },
        },
        {
            _id: 'template3',
            name: 'Fecha',
            key: '',
            type: 'date',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 3,
                column: 1,
                height: 4,
                width: 2,
            },
        },
        {
            _id: 'template4',
            name: 'Tiempo',
            key: '',
            type: 'time',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 4,
                column: 1,
                height: 5,
                width: 2,
            },
        },
        {
            _id: 'template5',
            name: 'Selección',
            key: '',
            type: 'select',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 5,
                column: 1,
                height: 6,
                width: 2,
            },
        },
        {
            _id: 'template6',
            name: 'Comentario',
            key: '',
            type: 'comment',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 6,
                column: 1,
                height: 7,
                width: 2,
            },
        },
        {
            _id: 'template7',
            name: 'Area',
            key: '',
            type: 'area',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 7,
                column: 1,
                height: 8,
                width: 2,
            },
        },
        {
            _id: 'template8',
            name: 'Validación',
            key: '',
            type: 'checkbox',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: false,
            isEditable: true,
            gridLocation: {
                row: 8,
                column: 1,
                height: 9,
                width: 2,
            },
        },
        {
            _id: 'template9',
            name: 'Servicio APIRest',
            key: '',
            type: 'rest_api',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            restApi: {
                httpURI: 'https://192.168.1.9:3000/api/user/?query=tecnologo&page=0&limit=100&params=&paramsExtra=&type=',
                typeAuth: 'JUMI',
                valueAuth: '',
                key: 'user_id',
                value: 'nickname',
            },
            gridLocation: {
                row: 9,
                column: 1,
                height: 10,
                width: 2,
            },
        },
        {
            _id: 'template10',
            name: 'Archivo',
            key: '',
            type: 'file',
            color: '',
            background: '',
            options: [],
            isRequired: true,
            constraint: '',
            value: '',
            isEditable: true,
            gridLocation: {
                row: 10,
                column: 1,
                height: 11,
                width: 2,
            },
        },
    ],
};
