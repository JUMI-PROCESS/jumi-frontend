import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';

import { FormRepositoryApi } from '../adapters/FormRepositoryApi';
import { Form } from '../domain/Form';

import './ListForms.css';

type Props = {};

export default function ListForms({}: Props) {
    const formRepository: FormRepositoryApi = new FormRepositoryApi();

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
        <div className='list-forms'>
            { data.map((item, idx) => <ItemForm name={item.name} date={item.dateRecord} />) }
        </div>
    );
}
