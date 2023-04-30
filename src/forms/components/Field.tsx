import React, { ReactElement, useEffect, useState } from 'react';

import { AxiosApiRest } from '../../output.adapters/AxiosApiRest';
import { IField, TypeField } from '../domain/Form';
import { MODELER, PANEL_MENU, VIEWVER } from '../utilities/TypeForm';
import './Field.css';
import OptionField from './OptionField';
import Validated from './Validated';

type Props = {
    type: String;
    item: IField;
    actions: string | string[] | Record<string, boolean>;
    onStart: Function;
    onEnter: Function;
    onDrop: Function;
    onExit: Function;
    onResize: Function;
    onDelete: Function;
    onChange: Function;
    onResizeDimention: Function;
    isDrag: boolean;
    showValid: boolean;
};

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
    showValid
}: Props) {
    const [fieldRender, setFieldRender] = useState<ReactElement<any, any> | null>(null);

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
        if (field.type == TypeField.checkbox) {
            field.value = e.target.checked;
            onChange(field);
        } else if (e.target.type.includes('restApi')) {
            field.value = e.target.value;
            onChange(field);
        } else {
            field.value = e.target.value;
            onChange(field);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const fieldRender = async () => {
                if (item.type == TypeField.comment) {
                    return (
                        <div className="field-input">
                            <span className="field-name-collapse comment">{item.name}</span>
                        </div>
                    );
                } else if (item.type == TypeField.select) {
                    return (
                        <div className="field-input">
                            <span className="field-name-collapse">
                                {item.name}
                                {item.isRequired ? <span className="required">*</span> : ''}
                            </span>
                            <select
                                style={{ width: '100%' }}
                                name={item._id}
                                id=""
                                value={item.value}
                                onChange={(e) => onChangeForm(e, item)}
                            >
                                {item.options.map((item_) => (
                                    <option key={item_.key} value={item_.key}>
                                        {item_.value}
                                    </option>
                                ))}
                            </select>
                            <Validated type={type} value={item.value} isRequired={item.isRequired} show={showValid} />
                        </div>
                    );
                } else if (item.type == TypeField.area) {
                    return (
                        <div className="field-input">
                            <span className="field-name-collapse">
                                {item.name}
                                {item.isRequired ? <span className="required">*</span> : ''}
                            </span>
                            <textarea
                                style={{
                                    width: '100%',
                                    height: item.heigth,
                                    resize: type == MODELER ? 'vertical' : 'none',
                                    overflow: 'auto',
                                }}
                                name={item._id}
                                id=""
                                value={item.value}
                                onChange={(e) => onChangeForm(e, item)}
                                required={item.isRequired ? true : false}
                                onMouseUp={(e) => {
                                    if (type == MODELER) onResizeDimention(e, item);
                                }}
                                readOnly={!item.isEditable}
                            ></textarea>
                            <Validated type={type} value={item.value} isRequired={item.isRequired} show={showValid} />
                        </div>
                    );
                } else if (item.type == TypeField.checkbox) {
                    return (
                        <div className="field-input">
                            <span className="field-name-collapse">
                                {item.name}
                                {item.isRequired ? <span className="required">*</span> : ''}
                            </span>
                            <input
                                style={{ width: '100%' }}
                                type={item.type}
                                name={item._id}
                                id=""
                                checked={item.value ? true : false}
                                onChange={(e) => onChangeForm(e, item)}
                                required={item.isRequired ? true : false}
                                disabled={!item.isEditable}
                            />
                            <Validated type={type} value={item.value} isRequired={item.isRequired} show={showValid} />
                        </div>
                    );
                } else if (item.type == TypeField.rest_api) {
                    const auth =
                        item.restApi.typeAuth == 'JUMI'
                            ? `Bearer ${localStorage.getItem('access_token')}`
                            : item.restApi.valueAuth;
                    const fetch = new AxiosApiRest({ headers: { Authorization: auth } }, item.restApi.httpURI, '');
                    const data =
                        type == PANEL_MENU || type == MODELER ? [] : (await fetch.getConecction().get('', {})).data;
                    return (
                        <div className="field-input">
                            <span className="field-name-collapse">
                                {item.name}
                                {item.isRequired ? <span className="required">*</span> : ''}
                            </span>
                            <select
                                style={{ width: '100%' }}
                                name={item._id}
                                id=""
                                value={item.value}
                                onChange={(e) => onChangeForm(e, item)}
                            >
                                <option key="" value="">--seleccione--</option>
                                {data.map((item_) => (
                                    <option key={item_[item.restApi.key]} value={item_[item.restApi.key]}>
                                        {item_[item.restApi.value]}
                                    </option>
                                ))}
                            </select>
                            <Validated type={type} value={item.value} isRequired={item.isRequired} show={showValid} />
                        </div>
                    );
                } else {
                    return (
                        <div className="field-input">
                            <span className="field-name-collapse">
                                {item.name}
                                {item.isRequired ? <span className="required">*</span> : ''}
                            </span>
                            <input
                                style={{ width: '100%' }}
                                type={item.type}
                                name={item._id}
                                id=""
                                value={item.value}
                                onChange={(e) => onChangeForm(e, item)}
                                required={item.isRequired ? true : false}
                                disabled={!item.isEditable}
                            />
                            <Validated type={type} value={item.value} isRequired={item.isRequired} show={showValid} />
                        </div>
                    );
                }
            };
            setFieldRender(await fieldRender());
        };
        fetchData();
    }, [JSON.stringify(item), showValid]);

    if (!fieldRender) return <span>Loading...</span>;

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
            <div key={item._id} className="no-point draggable" style={{ width: '100%' }}>
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
                {fieldRender}
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
