import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';

import ItemForm from './ItemForm';

import { Form } from '../domain/Form';

import './ListForms.css';
import { FormRepository } from '../ports/FormRepository';
import SearchInput from '../../components/SearchInput';
import Paginator from '../../components/Paginator';

type Props = {};

export default function ListForms({}: Props) {
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];

    const [data, setData] = useState<[Form] | null>(null);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsCounter('quimica', query, 'name');
            setSize(res.data.counter);
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        setPage(0);
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica', query, page, 'name');
            setData(res.data);
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica', query, page, 'name');
            setData(res.data);
        };

        fetchData();
    }, [page]);

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
            <Paginator limit={formRepository.limit} size={size} page={page} setPage={setPage} />
        </div>
    );
}
