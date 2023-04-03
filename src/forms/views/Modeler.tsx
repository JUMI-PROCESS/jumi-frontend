import React, { useState, useEffect } from 'react';

import { FormRepositoryApi } from '../adapters/FormRepositoryApi';
import Form from '../components/Form';

import dataTemplate from '/public/templateFields';

import { MODELER, PANEL_MENU, VIEWVER } from '../utilities/TypeForm';

type Props = {};

function Modeler({}: Props) {
    const formRepository: FormRepositoryApi = new FormRepositoryApi();

    const [dataMenu, setDataMenu] = useState({ name: 'Panel', columns: 1, rows: 4 });
    const [data, setData] = useState(null);
    const [fields, setFields] = useState(null);
    const [position, setPosition] = useState({
        pre: { element: null, coor: null },
        new: { element: null, coor: null },
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica');
            const { fields: fields_, ...rest } = res.data[0];
            setData(rest);
            setFields(fields_);
        };

        fetchData();
    }, []);

    if (!data || !fields) {
        return <span>Loading...</span>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Form
                type={MODELER}
                data={data}
                setData={setData}
                fields={fields}
                setFields={setFields}
                position={position}
                setPosition={setPosition}
                width={'80%'}
                classes={'panel-primary'}
            />
            <Form
                type={PANEL_MENU}
                data={dataMenu}
                fields={dataTemplate.fields}
                setFields={() => {}}
                position={position}
                setPosition={setPosition}
                fieldsModeler={fields}
                setFieldsModeler={setFields}
                dataModeler={data}
                width={'20%'}
                classes={'panel-secundary'}
            />
        </div>
    );
}

export default Modeler;
