import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';

import ItemForm from './ItemForm';

import { FormRepositoryApi } from '../adapters/FormRepositoryApi';
import { Form } from '../domain/Form';

import './ListForms.css';
import { FormRepository } from '../ports/FormRepository';
import SearchInput from '../../components/SearchInput';

type Props = {};

export default function ListForms({}: Props) {
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];

    const [data, setData] = useState<[Form] | null>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica', query, 2, '_id,name');
            setData(res.data);
        };

        fetchData();
    }, [query]);

    if (!data) {
        return <span>Loading...</span>;
    }

    return (
        <div className="d-grid backg-s2 p-10">
            <SearchInput query={query} setQuery={setQuery} />
            <div className="list-forms">
                {data.map((item, idx) => (
                    <ItemForm key={idx} _id={item._id} name={item.name} date={item.dateRecord} />
                ))}
            </div>
        </div>
    );
}
