import React from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import moment from 'moment';

import './ItemForm.css';
import { ParamsType } from '../utilities/TypeForm';

type Props = {
    _id?: string;
    name: string;
    date: number;
};

export default function ItemForm({ _id, name, date }: Props) {
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const actions = ParamsType[pathname]['actions'] as Record<string, boolean>;

    const onNavigate = () => {
        if (actions['isFill'])
            navigate(`/formularios/tareas/${_id}`)
    }

    return (
        <div className="target py-20" onClick={onNavigate}>
            <div className="target-info">
                <span className="h3">{name}</span>
                <span className="h4-sub">{moment(date).format('dd DD MMM YYYY HH:mm:ss')}</span>
            </div>
            <div className="target-options">
                {actions['isDelete'] ? <div className="icon">&#9746;</div> : <></>}
                {actions['isEdit'] ? (
                    <Link to={`/formularios/modelador/${_id}`} className="icon">
                        &#9998;
                    </Link>
                ) : (
                    <></>
                )}
                {actions['isInfo'] ? <div className="icon">&#9888;</div> : <></>}
            </div>
        </div>
    );
}
