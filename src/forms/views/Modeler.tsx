import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RepositoryContext } from '../../contexts/RepositoryContext';

import { useParams } from 'react-router-dom';

import { FormRepository } from '../ports/FormRepository';

import Form from '../components/Form';

import dataTemplate from '/public/templateFields';

import { MODELER, PANEL_MENU, VIEWVER, SAVE, UPDATE } from '../utilities/TypeForm';
import { Form as IForm } from '../domain/Form';
import { EntityRepository } from '../../output.ports/EntityRepository';

type Props = {
    form: IForm | null;
};

function Modeler({ form }: Props) {
    const userContext: Record<string, any> = useContext(UserContext);
    const formRepository: EntityRepository = useContext(RepositoryContext)['form'];

    const _id = useParams()['_id'] || '';

    const [dataMenu, setDataMenu] = useState({ name: 'Panel', columns: 1, rows: 4 });
    const [data, setData] = useState<object | null>(null);
    const [fields, setFields] = useState<object[] | null>(null);
    const [mode, setMode] = useState(SAVE);
    const [position, setPosition] = useState({
        pre: { element: null, coor: null },
        new: { element: null, coor: null },
    });

    useEffect(() => {
        formRepository.setConfig({ token: `${userContext['token']}` });
    }, []);

    useEffect(() => {
        if (!form) {
            setMode(UPDATE);
            const fetchData = async () => {
                const res = await formRepository.getById(_id);
                const { fields: fieldsAux, ...dataAux } = res.data;
                setData(dataAux);
                setFields(fieldsAux);
                console.log(dataAux, fieldsAux)
            };
            fetchData();
        } else {
            setMode(SAVE);
            const { fields: fieldsAux, ...dataAux } = form;
            setData(dataAux);
            setFields(fieldsAux);
        }
    }, [_id]);

    if (!data || !fields) {
        return <span>Loading...</span>;
    }

    return (
        <div className="d-flex backg-p3">
            <Form
                type={MODELER}
                mode={mode}
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
