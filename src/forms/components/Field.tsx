import React from 'react';
import { Type } from 'react-toastify/dist/utils';

import { IField, TypeField } from '../domain/Form';
import { MODELER, PANEL_MENU, VIEWVER } from '../utilities/TypeForm';
import './Field.css';
import OptionField from './OptionField';

function Field({
    type,
    item,
    actions,
    onStart,
    onEnter,
    onDrop,
    onExit,
    onResize,
    onDelete,
    onChange,
    onResizeDimention,
    isDrag,
}) {
    const onDragStart = (e, item) => {
        if (type == MODELER) onStart(e, item);
        else if (type == PANEL_MENU) {
            onStart(e, item, {
                isMenu: true,
            });
        }
    };

    const onDragEnter = (e, item) => {
        if (type == MODELER) onEnter(e, item);
        else if (type == PANEL_MENU) {
            onEnter(e, item, {
                isMenu: true,
            });
        }
    };

    const onDragDrop = (e, item) => {
        if (type == MODELER) onDrop(e, item);
        else if (type == PANEL_MENU) {
            onDrop(e, item, {
                isMenu: true,
            });
        }
    };

    const onDragExit = (e, item) => {
        if (type == MODELER) onExit(e, item);
        else if (type == PANEL_MENU) {
            onExit(e, item, {
                isMenu: true,
            });
        }
    };

    const onClickResize = (e, item, config) => {
        if (type == MODELER) onResize(e, item, config);
    };

    const onClickDelete = (e, item, config) => {
        if (type == MODELER) onDelete(e, item, config);
    };

    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>, field: IField) => {
        console.log('cambandoi');
        if (field.type == TypeField.checkbox) {
            console.log('si check');
            field.value = e.target.checked;
            onChange(field);
        } else {
            field.value = e.target.value;
            onChange(field);
        }
    };

    const getTypeField = (field: IField) => {
        if (field.type == TypeField.comment) {
            return (
                <div className="field-input">
                    <span className="field-name-collapse comment">{field.name}</span>
                </div>
            );
        } else if (field.type == TypeField.select) {
            return (
                <div className="field-input">
                    <span className="field-name-collapse">{field.name}</span>
                    <select
                        style={{ width: '100%' }}
                        name={field._id}
                        id=""
                        value={field.value}
                        onChange={(e) => onChangeForm(e, field)}
                    >
                        {field.options.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (field.type == TypeField.area) {
            return (
                <div className="field-input">
                    <span className="field-name-collapse">
                        {field.name}
                        {field.isRequired ? <span className="required">*</span> : ''}
                    </span>
                    <textarea
                        style={{
                            width: '100%',
                            height: field.heigth,
                            resize: type == MODELER ? 'vertical' : 'none',
                            overflow: 'auto',
                        }}
                        name={field._id}
                        id=""
                        value={field.value}
                        onChange={(e) => onChangeForm(e, field)}
                        required={field.isRequired ? true : false}
                        onMouseUp={(e) => {
                            if (type == MODELER) onResizeDimention(e, field);
                        }}
                        readOnly={!field.isEditable}
                    ></textarea>
                </div>
            );
        } else if (field.type == TypeField.checkbox) {
            return (
                <div className="field-input">
                    <span className="field-name-collapse">
                        {field.name}
                        {field.isRequired ? <span className="required">*</span> : ''}
                    </span>
                    <input
                        style={{ width: '100%' }}
                        type={field.type}
                        name={field._id}
                        id=""
                        checked={field.value ? true : false}
                        onChange={(e) => onChangeForm(e, field)}
                        required={field.isRequired ? true : false}
                        disabled={!field.isEditable}
                    />
                </div>
            );
        } else {
            return (
                <div className="field-input">
                    <span className="field-name-collapse">
                        {field.name}
                        {field.isRequired ? <span className="required">*</span> : ''}
                    </span>
                    <input
                        style={{ width: '100%' }}
                        type={field.type}
                        name={field._id}
                        id=""
                        value={field.value}
                        onChange={(e) => onChangeForm(e, field)}
                        required={field.isRequired ? true : false}
                        disabled={!field.isEditable}
                    />
                </div>
            );
        }
    };

    return (
        <div
            key={item._id}
            style={{
                gridColumn: `${item.gridLocation.column} / ${item.gridLocation.width}`,
                gridRow: `${item.gridLocation.row} / ${item.gridLocation.height}`,
                height: 'auto',
                width: 'initial',
            }}
            className={`grid-area ${type == VIEWVER ? 'form-grid-view' : ''}`}
        >
            <div key={item._id} className="no-point draggable" style={{width: '100%'}}>
                {type == MODELER || type == PANEL_MENU ? (
                    <div
                        className="dragge"
                        key={item._id}
                        id={item._id}
                        onDragEnter={(e) => onDragEnter(e, item)}
                        onDragStart={(e) => onDragStart(e, item)}
                        onDragEnd={(e) => onDragDrop(e, item)}
                        onDragExit={(e) => onDragExit(e, item)}
                        onTouchStart={(e) => onDragStart(e, item)}
                        onTouchMove={(e) => onDragEnter(e, item)}
                        onTouchEnd={(e) => onDragDrop(e, item)}
                        draggable={isDrag}
                    >
                        &#9782;
                    </div>
                ) : (
                    <></>
                )}
                {getTypeField(item)}
                {type == MODELER && type != VIEWVER ? (
                    <>
                        <OptionField
                            buttonOpen={
                                <div id={item._id} className="edit" onClick={(e) => onClickOptions(e, item)}>
                                    {'¬'}
                                </div>
                            }
                            props={item}
                            setProps={onChange}
                        />
                        <div id={item._id} className="resize-right" onClick={(e) => onClickResize(e, item, { dir: 1 })}>
                            {'>'}
                        </div>
                        <div id={item._id} className="resize-left" onClick={(e) => onClickResize(e, item, { dir: -1 })}>
                            {'<'}
                        </div>
                        <div id={item._id} className="delete" onClick={(e) => onClickDelete(e, item)}>
                            {'x'}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Field;
