import React from 'react';

import Paginator from '../../components/Paginator';
import SearchInput from '../../components/SearchInput';
import { Form } from '../domain/Form';
import ItemForm from './ItemForm';
import './ListForms.css';

type Props = {
    data: Array<Form>;
    query: string;
    setQuery: Function;
    page: number;
    setPage: Function;
    size: number;
    limit: number;
};

export default function ListForms({ data, query, setQuery, page, setPage, size, limit }: Props) {
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
