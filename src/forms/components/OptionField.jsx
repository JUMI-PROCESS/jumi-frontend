import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { TypeField } from '../domain/Form';
import './OptionField.css';

function OptionField({ buttonOpen, props, setProps }) {
    const onProps = (e) => {
        if (e.target.name == 'value') {
            if (e.target.type == 'checkbox') props.value = e.target.checked;
            else props.value = e.target.value;
        } else {
            if (e.target.type == 'checkbox') props[e.target.name] = e.target.checked;
            else if (e.target.name.includes('restApi')) {
                props.restApi[e.target.name.split('.')[1]] = e.target.value;
            } else props[e.target.name] = e.target.value;
        }
        setProps(props);
    };

    return (
        <div>
            <Popup trigger={buttonOpen} position="bottom left" closeOnDocumentClick>
                <div style={{ padding: '10px' }}>
                    <b className="h7" style={{ margin: '0' }}>
                        Propiedades
                    </b>
                    <hr />
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Nombre</span>
                        <input
                            style={{ width: '90%' }}
                            type="text"
                            name="name"
                            id=""
                            value={props.name}
                            onChange={onProps}
                        />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Valor por defecto</span>
                        <input
                            style={{ width: '90%' }}
                            type={props.type}
                            name="value"
                            id=""
                            checked={props.value}
                            value={props.value}
                            onChange={onProps}
                        />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Llave</span>
                        <input
                            style={{ width: '90%' }}
                            type="text"
                            name="key"
                            id=""
                            value={props.key}
                            onChange={onProps}
                        />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>¿Editable?</span>
                        <input
                            style={{ width: '90%' }}
                            type="checkbox"
                            name="isEditable"
                            id=""
                            checked={props.isEditable}
                            value={props.isEditable}
                            onChange={onProps}
                        />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>¿Requerido?</span>
                        <input
                            style={{ width: '90%' }}
                            type="checkbox"
                            name="isRequired"
                            id=""
                            checked={props.isRequired}
                            value={props.isRequired}
                            onChange={onProps}
                        />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Tipo</span>
                        <select
                            style={{ width: '90%' }}
                            type="text"
                            name="type"
                            id=""
                            value={props.type}
                            onChange={onProps}
                        >
                            <option value="texto">Texto</option>
                            <option value="number">Númerico</option>
                            <option value="time">Tiempo</option>
                            <option value="date">Fecha</option>
                            <option value="select">Selección</option>
                            <option value="comment">Comentario</option>
                            <option value="area">Area</option>
                            <option value="checkbox">Validación</option>
                            <option value="rest_api">Servicio APIRest</option>
                        </select>
                    </div>
                    {props.type == TypeField.rest_api ? (
                        <>
                            <b className="h7" style={{ margin: '0' }}>
                                API Rest
                            </b>
                            <hr />
                            <div style={{ padding: '0' }} className="field-input">
                                <span>URL</span>
                                <input
                                    style={{ width: '90%' }}
                                    type="text"
                                    name="restApi.httpURI"
                                    id=""
                                    value={props.restApi.httpURI}
                                    onChange={onProps}
                                />
                            </div>
                            <div style={{ padding: '0' }} className="field-input">
                                <span>Llave</span>
                                <input
                                    style={{ width: '90%' }}
                                    type="text"
                                    name="restApi.key"
                                    id=""
                                    value={props.restApi.key}
                                    onChange={onProps}
                                />
                            </div>
                            <div style={{ padding: '0' }} className="field-input">
                                <span>Valor</span>
                                <input
                                    style={{ width: '90%' }}
                                    type="text"
                                    name="restApi.value"
                                    id=""
                                    value={props.restApi.value}
                                    onChange={onProps}
                                />
                            </div>
                            <div style={{ padding: '0' }} className="field-input">
                                <span>Tipo autenticación</span>
                                <select
                                    style={{ width: '90%' }}
                                    type="text"
                                    name="restApi.value"
                                    id=""
                                    value={props.restApi.typeAuth}
                                    onChange={onProps}
                                >
                                    <option value="JUMI">JUMI</option>
                                    <option value="bearer">Bearer</option>
                                    <option value="basic">Basic</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            <div style={{ padding: '0' }} className="field-input">
                                <span>Valor autenticación</span>
                                <input
                                    style={{ width: '90%' }}
                                    type="text"
                                    name="restApi.valueAuth"
                                    id=""
                                    value={props.restApi.valueAuth}
                                    onChange={onProps}
                                />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </Popup>
        </div>
    );
}

export default OptionField;
