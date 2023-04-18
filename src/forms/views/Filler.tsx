import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { UserContext } from '../../contexts/UserContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import Form from '../components/Form';
import { Form as IForm } from '../domain/Form';
import { MODELER, PANEL_MENU, SAVE, UPDATE, VIEWVER } from '../utilities/TypeForm';

type Props = {
    form: IForm | null;
};

function Filler({ form }: Props) {
    const userContext: Record<string, any> = useContext(UserContext);
    const formRepository: EntityRepository = useContext(RepositoryContext)['form'];

    const _id = useParams()['_id'] || '';

    const [dataMenu, setDataMenu] = useState({ name: 'Panel', columns: 1, rows: 4 });
    const [data, setData] = useState<object | null>(null);
    const [fields, setFields] = useState<object[] | null>(null);
    const [mode, setMode] = useState(VIEWVER);
    const [position, setPosition] = useState({
        pre: { element: null, coor: null },
        new: { element: null, coor: null },
    });

    useEffect(() => {
        formRepository.setConfig({ token: `${userContext['token']}` });
    }, []);

    useEffect(() => {
        if (!form) {
            setMode(VIEWVER);
            const fetchData = async () => {
                const res = await formRepository.getById(_id);
                const { fields: fieldsAux, ...dataAux } = res.data;
                setData(dataAux);
                setFields(fieldsAux);
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
                type={VIEWVER}
                mode={mode}
                data={data}
                setData={setData}
                fields={fields}
                setFields={setFields}
                position={position}
                setPosition={setPosition}
                width={'100%'}
                classes={'panel-primary'}
            />
        </div>
    );
}

export default Filler;
