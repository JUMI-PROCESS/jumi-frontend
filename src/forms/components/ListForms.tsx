import React, { useState, useEffect, useContext } from 'react';
import {RepositoryContext} from '../../contexts/RepositoryContext'

import ItemForm from './ItemForm';

import { FormRepositoryApi } from '../adapters/FormRepositoryApi';
import { Form } from '../domain/Form';

import './ListForms.css';
import { FormRepository } from '../ports/FormRepository';

type Props = {};

export default function ListForms({}: Props) {
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];

    const [data, setData] = useState<[Form] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica');
            setData(res.data);
        };

        fetchData();
    }, []);

    if (!data) {
        return <span>Loading...</span>;
    }

    return (
        <div className='b backg-s2 list-forms'>
            { data.map((item, idx) => <ItemForm key={idx} name={item.name} date={item.dateRecord} />) }
        </div>
    );
}
