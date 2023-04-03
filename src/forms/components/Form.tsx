import React, { useEffect } from 'react';

import Field from './Field';

import { FormRepositoryApi } from '../adapters/FormRepositoryApi';

import './Form.css';

import { MODELER, PANEL_MENU, VIEWVER } from '../utilities/TypeForm';

function Form({ type, data, setData, fields, setFields, position, setPosition, fieldsModeler, setFieldsModeler, dataModeler, setDataModeler, width, height, classes }) {
    const formRepository: FormRepositoryApi = new FormRepositoryApi();

    useEffect(() => {
        if (type == MODELER) setFields(fillSpace(data, fields));
    }, [type, data]);

    const getRandomId = () => {
        return (Math.random() + 1).toString(36).substring(7);
    };

    const fillSpace = (dataTemplate, fieldsTemplate) => {
        let fieldsAux = [];
        for (var i = 0; i < dataTemplate.rows; i++) {
            for (var j = 0; j < dataTemplate.columns; j++) {
                var isBusy = fieldsTemplate.find(
                    (item) =>
                        item.gridLocation.row == i + 1 && j + 1 >= item.gridLocation.column && j + 1 < item.gridLocation.width && !item._id.includes('blank')
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
                    var isRepeat = fieldsAux.find((item) => item._id == isBusy._id);
                    if (!isRepeat) fieldsAux.push(isBusy);
                }
            }
        }
        return fieldsAux;
    };

    const onDrop = (e, item, config = {}) => {
        e.target.className = 'dragge';
        if (position.pre.element && position.new.element) {
            var copyFields = type == PANEL_MENU ? JSON.parse(JSON.stringify(fieldsModeler)) : JSON.parse(JSON.stringify(fields));
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
            if (type == PANEL_MENU) setFieldsModeler(fillSpace(dataModeler, copyFields));
            else if (type == MODELER) setFields(fillSpace(data, copyFields));
            setPosition({
                pre: { element: null, coor: null },
                new: { element: null, coor: null },
            });
        }
    };

    const onStart = (e, item, config = {}) => {
        var isMenu = config['isMenu'] || false;
        var idx = fields.findIndex((item) => item._id == e.target.id);
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

    const onEnter = (e, item, config = {}) => {
        for (var focus of document.getElementsByClassName('on-drag-enter')) {
            focus.classList.remove('on-drag-enter')
        }
        e.target.className += ' on-drag-enter';
        var idx = fields.findIndex((item) => item._id == e.target.id);
        if (idx > -1 && position.pre.element._id != item._id) {
            setPosition({
                ...position,
                new: { element: item, coor: idx },
            });
        }
    };

    const onExit = (e, item, config = {}) => {
        e.target.className = e.target.className.replace('on-drag-enter', '');
    };

    const onResize = (e, item, config) => {
        var dir = config['dir'] | 1;
        var isBlank = fields.find(
            (itemI) =>
                (dir == 1 ? itemI.gridLocation.column : itemI.gridLocation.width) == (dir == 1 ? item.gridLocation.width : item.gridLocation.column) &&
                itemI.gridLocation.row == item.gridLocation.row &&
                itemI._id.includes('blank')
        );
        var pos = fields.findIndex((itemI) => itemI._id == item._id);
        if (isBlank) {
            var copyFields = JSON.parse(JSON.stringify(fields));
            if (dir == 1) copyFields[pos].gridLocation.width = item.gridLocation.width + dir;
            else copyFields[pos].gridLocation.column = item.gridLocation.column + dir;
            setFields(fillSpace(data, copyFields));
        }
    };

    const onDelete = (e, item) => {
        setFields(
            fillSpace(
                data,
                fields.filter((itemI) => itemI._id != item._id)
            )
        );
    };

    const onChangeField = (field) => {
        setFields(fields.map((item) => (item._id == field._id ? field : item)));
    };

    const onMoreRow = () => {
        const dataAux = JSON.parse(JSON.stringify(data));
        dataAux.rows += 1;
        setData(dataAux);
        setFields(fillSpace(dataAux, fields));
    };

    const onSave = async () => {
        let dataSave = fields.filter((item) => !item._id.includes('blank'));
        dataSave = dataSave.map((item) => {
            if (item._id.includes('new')) {
                const { _id, ...rest } = item;
                return rest;
            } else {
                return item;
            }
        })
        await formRepository.updateForm(data._id, { form: { ...data, fields: dataSave } });
    };

    const getOptions = () => {
        if (type == MODELER) {
            return (
                <div style={{ display: 'inline-flex' }}>
                    <button style={{ marginRight: '2px' }} disabled>
                        RETORNAR
                    </button>
                    <button style={{ marginLeft: '2px' }} onClick={onSave}>
                        GUARDAR
                    </button>
                </div>
            );
        }
    };

    return (
        <div className={classes} style={{ position: 'relative', width: width, height: height }}>
            {type == MODELER ? (
                <div className="more-row" onClick={onMoreRow}>
                    +
                </div>
            ) : (
                <></>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                <h4>{data.name}</h4>
                {getOptions()}
            </div>
            <div
                id="form"
                className="form-grid"
                style={{
                    gridTemplateColumns: `repeat(${data.columns}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${data.rows}, max-content)`,
                }}
            >
                {fields.map((item, i) => {
                    if (!item._id.includes('blank')) {
                        return (
                            <Field
                                key={i}
                                type={type}
                                item={item}
                                onStart={onStart}
                                onEnter={onEnter}
                                onDrop={onDrop}
                                onExit={onExit}
                                onResize={onResize}
                                onDelete={onDelete}
                                onChange={onChangeField}
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
                                draggable
                            ></div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default Form;
