import React from 'react';

import ItemProcess from './ItemProcess';

import { Process } from '../domain/Process';

import './ListProcesses.css';
import SearchInput from '../../components/SearchInput';
import Paginator from '../../components/Paginator';

type Props = {
    data: Array<Process>;
    query: string;
    setQuery: Function;
    page: number;
    setPage: Function;
    size: number;
    limit: number;
    type: string;
};

export default function ListProcesses({ data, query, setQuery, page, setPage, size, limit, type }: Props) {
    return (
        <div className="d-grid backg-s2 p-10">
            <SearchInput query={query} setQuery={setQuery} />
            <div className="list-forms">
                {data.map((item, idx) => (
                    <ItemProcess key={idx} _id={item._id} name={item.name} date={item.dateRecorded} type={type}/>
                ))}
            </div>
            <Paginator limit={limit} size={size} page={page} setPage={setPage} />
        </div>
    );
}
