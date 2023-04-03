import React from 'react';

import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './OptionField.css';

function OptionField({ buttonOpen, props, setProps }) {
    const onProps = (e) => {
        if (e.target.name == 'value') props.value.value = e.target.value;
        else props[e.target.name] = e.target.value;
        setProps(props);
    };

    return (
        <div>
            <Popup trigger={buttonOpen} position="bottom left" closeOnDocumentClick>
                <div style={{ padding: '10px' }}>
                    <h4 style={{ margin: '0' }}>Propiedades</h4>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Nombre</span>
                        <input style={{ width: '90%' }} type="text" name="name" id="" value={props.name} onChange={onProps} />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Valor por defecto</span>
                        <input style={{ width: '90%' }} type={props.type} name="value" id="" value={props.value.value} onChange={onProps} />
                    </div>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>Tipo</span>
                        <select style={{ width: '90%' }} type="text" name="type" id="" value={props.type} onChange={onProps}>
                            <option value="texto">Texto</option>
                            <option value="number">Número</option>
                            <option value="time">Tiempo</option>
                            <option value="date">Fecha</option>
                            <option value="select">Seleccion</option>
                        </select>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default OptionField;
