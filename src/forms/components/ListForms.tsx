import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';

import ItemForm from './ItemForm';

import { Form } from '../domain/Form';

import './ListForms.css';
import { FormRepository } from '../ports/FormRepository';
import SearchInput from '../../components/SearchInput';
import Paginator from '../../components/Paginator';

type Props = {
    data: Array<Form>
    query: string,
    setQuery: Function,
    page: number,
    setPage: Function,
    size: number,
    limit: number,
};

export default function ListForms({data, query, setQuery, page, setPage, size, limit}: Props) {
    return (
        <div className="d-grid backg-s2 p-10">
            <SearchInput query={query} setQuery={setQuery} />
            <div className="list-forms">
                {data.map((item, idx) => (
                    <ItemForm key={idx} _id={item._id} name={item.name} date={item.dateRecorded} />
                ))}
            </div>
            <Paginator limit={limit} size={size} page={page} setPage={setPage} />
        </div>
    );
}
