import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { UserContext } from '../../contexts/UserContext';
import { useDimention } from '../../hooks/useDimention';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { Definition, IDefinition } from '../../process/domain/Process';
import { IUser, User } from '../../users/domain/user';
import { FormTemplate, IField, Form as IForm, IFormTemplate, StatusForm, Field as Field_ } from '../domain/Form';
import { MODELER, PANEL_MENU, ParamsType, SAVE, UPDATE, VIEWVER } from '../utilities/TypeForm';
import { getRandomId } from '../utilities/Utilities';
import Field from './Field';
import './Form.css';

interface IConfig {
    [key: string]: string | number | boolean;
}

interface IPosition {
    element: Record<string, number | string>;
    coor: number;
}

interface IPositionCurrent {
    pre: IPosition;
    new: IPosition;
}

type Props = {
    type: string;
    mode?: string;
    data: IForm;
    setData?: Function;
    fields: Array<IField>;
    setFields: Function;
    position: IPositionCurrent;
    setPosition: Function;
    fieldsModeler?: Array<IField>;
    setFieldsModeler?: Function;
    dataModeler?: IForm;
    setDataModeler?: object;
    width?: string;
    heigth?: string;
    classes?: string;
};

function Form({
    type,
    mode,
    data,
    setData,
    fields,
    setFields,
    position,
    setPosition,
    fieldsModeler,
    setFieldsModeler,
    dataModeler,
    setDataModeler,
    width = 'auto',
    heigth = 'auto',
    classes,
}: Props) {
    const user: Record<string, any> = useContext(UserContext);
    const formRepository: EntityRepository<IForm> = useContext(RepositoryContext)['form'];
    const formTemplateRepository: EntityRepository<IFormTemplate> = useContext(RepositoryContext)['formTemplate'];
    const definitionRepository: EntityRepository<IDefinition> = useContext(RepositoryContext)['definition'];
    const userRepository: EntityRepository<IUser> = useContext(RepositoryContext)['user'];

    const navigate = useNavigate();
    const { width: width_ } = useDimention();

    const { pathname } = useLocation();
    const actions = (ParamsType[pathname] || ParamsType['/formularios/tareas'] || ParamsType['/formularios/modelador'])[
        'actions'
    ];

    const [definitions, setDefinitions] = useState<Array<Definition>>([]);
    const [users, setUsers] = useState<Array<User>>([]);
    const [showValid, setShowValid] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const definitions = await definitionRepository.getBy('', 0, '', [], '', 100);
            setDefinitions(definitions.data);
            const users = await userRepository.getBy('', 0, '', [], '', 100);
            setUsers(users.data);
        };
        if (type == MODELER) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        console.log(type);
        if (type == MODELER) {
            setFields(fillSpace(data, fields));
        }
    }, [type, JSON.stringify(data)]);

    const fillSpace = (dataTemplate?: IForm, fieldsTemplate?: Array<IField>) => {
        let fieldsAux: Array<Record<string, string | number | object> | IField> = [];
        if (!dataTemplate && !fieldsTemplate) return fieldsAux;
        for (var i = 0; dataTemplate && i < dataTemplate.rows; i++) {
            for (var j = 0; dataTemplate && j < dataTemplate.columns; j++) {
                var isBusy = (fieldsTemplate || []).find(
                    (item: IField) =>
                        item.gridLocation.row == i + 1 &&
                        j + 1 >= item.gridLocation.column &&
                        j + 1 < item.gridLocation.width &&
                        item._id &&
                        !item._id.includes('blank'),
                );
                if (!isBusy) {
                    fieldsAux.push({
                        _id: `blank${j}${i}`,
                        gridLocation: {
                            row: i + 1,
                            height: i + 2,
                            column: j + 1,
                            width: j + 2,
                        },
                    });
                } else {
                    var isRepeat = fieldsAux.find((item) => item._id == isBusy?._id);
                    const { _id, ...rest } = isBusy;
                    if (!isRepeat && _id) fieldsAux.push({ _id, ...rest });
                }
            }
        }
        return fieldsAux;
    };

    const onDrop = (e: React.DragEvent<HTMLElement>, item: IField, config = {}) => {
        (e.target as HTMLElement).className = 'dragge';
        if (position.pre.element && position.new.element) {
            var copyFields =
                type == PANEL_MENU ? JSON.parse(JSON.stringify(fieldsModeler)) : JSON.parse(JSON.stringify(fields));
            var positionPre = JSON.parse(JSON.stringify(position.pre));
            var positionNew = JSON.parse(JSON.stringify(position.new));
            if (!positionPre.element._id.includes('template')) {
                copyFields[position.pre.coor].gridLocation = positionNew.element.gridLocation;
                copyFields[position.new.coor].gridLocation = positionPre.element.gridLocation;
            } else if (positionPre.element._id.includes('template') && positionNew.element._id.includes('blank')) {
                positionPre.element.gridLocation = positionNew.element.gridLocation;
                positionPre.element._id = `new${getRandomId()}`;
                copyFields[position.new.coor] = positionPre.element;
            }
            if (type == PANEL_MENU && setFieldsModeler) setFieldsModeler(fillSpace(dataModeler, copyFields));
            else if (type == MODELER) setFields(fillSpace(data, copyFields));
            setPosition({
                pre: { element: null, coor: null },
                new: { element: null, coor: null },
            });
        }
    };

    const onStart = (e: React.DragEvent<HTMLElement>, item: IField, config: IConfig = {}) => {
        var isMenu = config['isMenu'] || false;
        var idx = fields.findIndex((item) => item._id == (e.target as HTMLElement).id);
        if (idx > -1 && !isMenu) {
            setPosition({
                ...position,
                pre: { element: item, coor: idx },
            });
        }
        if (isMenu) {
            setPosition({
                ...position,
                pre: { element: item, coor: -1 },
            });
        }
    };

    const onEnter = (e: React.DragEvent<HTMLElement>, item: IField, config: IConfig = {}) => {
        for (var focus of document.getElementsByClassName('on-drag-enter')) {
            focus.classList.remove('on-drag-enter');
        }
        (e.target as HTMLElement).className += ' on-drag-enter';
        var idx = fields.findIndex((item) => item._id == (e.target as HTMLElement).id);
        if (idx > -1 && position.pre.element._id != item._id) {
            setPosition({
                ...position,
                new: { element: item, coor: idx },
            });
        }
    };

    const onExit = (e: React.DragEvent<HTMLElement>, item: IField, config: IConfig = {}) => {
        (e.target as HTMLElement).className = (e.target as HTMLElement).className.replace('on-drag-enter', '');
    };

    const onResize = (e: React.MouseEvent<HTMLElement>, item: IField, config: IConfig = {}) => {
        var dir = config['dir'] || 1;
        var isBlank = fields.find(
            (itemI) =>
                (dir == 1 ? itemI.gridLocation.column : itemI.gridLocation.width) ==
                    (dir == 1 ? item.gridLocation.width : item.gridLocation.column) &&
                itemI.gridLocation.row == item.gridLocation.row &&
                itemI._id &&
                itemI._id.includes('blank'),
        );
        var pos = fields.findIndex((itemI) => itemI._id == item._id);
        if (isBlank) {
            var copyFields = JSON.parse(JSON.stringify(fields));
            if (dir == 1) copyFields[pos].gridLocation.width = item.gridLocation.width + dir;
            else copyFields[pos].gridLocation.column = item.gridLocation.column + (dir as number);
            setFields(fillSpace(data, copyFields));
        }
    };

    const onDelete = (e: MouseEvent<HTMLElement>, item: IField) => {
        setFields(
            fillSpace(
                data,
                fields.filter((itemI) => itemI._id != item._id),
            ),
        );
    };

    const onChangeField = (field: IField) => {
        setFields(fields.map((item) => (item._id == field._id ? field : item)));
    };

    const onMoreRow = () => {
        const dataAux = JSON.parse(JSON.stringify(data));
        dataAux.rows += 1;
        if (setData) setData(dataAux);
        setFields(fillSpace(dataAux, fields));
    };

    const onSave = async (e) => {
        e.preventDefault();
        let dataSave = fields.filter((item) => item._id && !item._id.includes('blank'));
        dataSave = dataSave.map((item) => {
            if (item._id && item._id.includes('new')) {
                const { _id, ...rest } = item;
                // NO ENVIAR ID SÍ LA BD LO PONE
                return item;
            } else {
                return item;
            }
        });
        if (mode == SAVE) {
            const { _id, ...rest } = data;
            formTemplateRepository
                .save(new FormTemplate({ ...data, fields: dataSave }))
                .then((data) => {
                    toast.success('Formulario guardado');
                    navigate('/formularios/todos');
                })
                .catch((error) => toast.error(error));
        }
        if (mode == UPDATE) {
            formTemplateRepository
                .update(data._id || '', new FormTemplate({ ...data, fields: dataSave }))
                .then((data) => {
                    toast.success('Formulario actualizado');
                    navigate('/formularios/todos');
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
        if (mode == VIEWVER) {
            const isValid = onValidated();
            if (isValid) {
                formRepository
                    .complete(data._id || '', new IForm({ ...data, status: StatusForm.received, fields: dataSave }))
                    .then((data) => {
                        toast.success('Formulario diligenciado');
                        navigate('/formularios/tareas');
                    })
                    .catch((error) => toast.error(error));
            } else {
                setShowValid(true);
            }
        }
    };

    const onValidated = () => {
        return fields.reduce((b, a) => b && new Field_(a).validated(), true);
    };

    const onResizeDimention = (e: React.DragEvent<HTMLElement>, item: IField) => {
        const field = fields.find((field_) => field_._id == item._id);
        if (field) {
            field.width = e.currentTarget.clientWidth;
            field.heigth = e.currentTarget.clientHeight;
            setFields(fields.map((field_) => (field_._id == item._id ? field : field_)));
        }
    };

    const onSelect = (e) => {
        const name = e.target.name;
        const key = e.target.value;
        const options = e.target.options;
        const tenant = user['user_metadata']['tenant'];
        if (name == 'startProcess') {
            setData({
                ...data,
                startProcess: e.target.value,
                callbackProcess: `process-definition/key/${e.target.value}/tenant-id/${tenant}/start`,
            });
        }
        if (name == 'availableUsers') {
            console.log(options);
            setData({
                ...data,
                availableUsers: Array.from(e.target.selectedOptions, (option) => option.value),
            });
        }
    };

    const getOptions = () => {
        if (type == MODELER || type == VIEWVER) {
            return (
                <div style={{ display: 'inline-flex', gap: '5px' }}>
                    <button style={{ marginRight: '2px' }} disabled>
                        RETORNAR
                    </button>
                    {type == MODELER ? (
                        <>
                            <select
                                className="px-5"
                                name="startProcess"
                                id=""
                                value={data.startProcess}
                                onChange={onSelect}
                            >
                                <option key="none" value="">
                                    --- seleccione un proceso ---
                                </option>
                                {definitions.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="px-5"
                                name="availableUsers"
                                id=""
                                value={data.availableUsers}
                                onChange={onSelect}
                                multiple
                            >
                                {users.map((item) => (
                                    <option
                                        key={item.user_id}
                                        value={item.user_id}
                                        selected={data.availableUsers.find((item_) => item_ == item)}
                                    >
                                        {item.nickname}
                                    </option>
                                ))}
                            </select>
                            <button style={{ marginLeft: '2px' }} onClick={onSave}>
                                GUARDAR
                            </button>
                        </>
                    ) : (
                        <button style={{ marginLeft: '2px' }} onClick={onSave}>
                            ENVIAR
                        </button>
                    )}
                </div>
            );
        }
    };

    if (!actions && type) return <></>;

    return (
        <form className={classes} style={{ position: 'relative', width: width, height: heigth }} noValidate>
            <div className="meta-form d-flex justify-content-between py-10" style={{ alignItems: 'center' }}>
                <div className="h7">
                    {type != MODELER ? (
                        data.name
                    ) : (
                        <input
                            name="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    )}
                </div>
                {getOptions()}
            </div>
            <div
                id="form"
                className={`form-grid`}
                style={{
                    gridTemplateColumns: `repeat(${data.columns}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${data.rows}, max-content)`,
                }}
            >
                {type == MODELER ? (
                    <div className="more-row" onClick={onMoreRow}>
                        +
                    </div>
                ) : (
                    <></>
                )}
                {fields.map((item, i) => {
                    if (item._id && !item._id.includes('blank')) {
                        return (
                            <Field
                                key={i}
                                type={type}
                                actions={actions}
                                item={item}
                                onStart={onStart}
                                onEnter={onEnter}
                                onDrop={onDrop}
                                onExit={onExit}
                                onResize={onResize}
                                onDelete={onDelete}
                                onChange={onChangeField}
                                onResizeDimention={onResizeDimention}
                                isDrag={width_ >= 750}
                                showValid={showValid}
                            />
                        );
                    } else {
                        return (
                            <div
                                id={item._id}
                                key={item._id}
                                className="field-blank"
                                style={{
                                    gridColumn: `${item.gridLocation.column} / ${item.gridLocation.width}`,
                                    gridRow: `${item.gridLocation.row} / ${item.gridLocation.height}`,
                                }}
                                onDragEnter={(e) => onEnter(e, item)}
                                onDragExit={(e) => onExit(e, item)}
                                draggable={width_ >= 750}
                            ></div>
                        );
                    }
                })}
            </div>
        </form>
    );
}

export default Form;
