import React from 'react';

import Paginator from '../../components/Paginator';
import SearchInput from '../../components/SearchInput';
import { Notification_ } from '../domain/Notification';
import ItemNotification from './ItemNotification';
import './ListNotification.css';

type Props = {
    data: Array<Notification_>;
    query: string;
    setQuery: Function;
    page: number;
    setPage: Function;
    size: number;
    limit: number;
};

export default function ListNotifications({ data, query, setQuery, page, setPage, size, limit }: Props) {
    console.log(limit)
    return (
        <div className="d-grid backg-s2 p-10" style={{width: '120px'}}>
            <SearchInput query={query} setQuery={setQuery} />
            <div className="d-flex-columns py-10" style={{gap: '10px'}}>
                {data.map((item, idx) => (
                    <ItemNotification key={idx} _id={item._id} name={item.title} date={item.dateRecorded} message={item.message}/>
                ))}
            </div>
            <Paginator limit={limit} size={size} page={page} setPage={setPage} />
        </div>
    );
}
