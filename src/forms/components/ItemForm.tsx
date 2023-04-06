import React from 'react';

import { Link } from 'react-router-dom';

import moment from 'moment'

import './ItemForm.css';

type Props = {
    _id?: string,
    name: string;
    date: number;
};

export default function ItemForm({ _id, name, date }: Props) {
    return (
        <div className='target py-20'>
            <div className="target-info">
                <span className='h3'>{name}</span>
                <span className='h4-sub'>{moment(date).format('dd DD MMM YYYY HH:mm:ss')}</span>
            </div>
            <div className='target-options'>
                <div className="icon">&#9746;</div>
                <Link to={`/formularios/modelador/${_id}`} className="icon">&#9998;</Link>
                <div className="icon">&#9888;</div>
            </div>
        </div>
    );
}
