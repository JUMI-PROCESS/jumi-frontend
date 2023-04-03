import React from 'react';

import moment from 'moment'

import './ItemForm.css';

type Props = {
    name: string;
    date: number;
};

export default function ItemForm({ name, date }: Props) {
    return (
        <div className='target'>
            <div className="target-info">
                <span className='h3'>{name}</span>
                <span className='h4-sub'>{moment(date).format('dd DD MMM YYYY HH:mm:ss')}</span>
            </div>
            <div className='target-options'>
                <div className="icon">&#9746;</div>
                <div className="icon">&#9998;</div>
                <div className="icon">&#9888;</div>
            </div>
        </div>
    );
}
