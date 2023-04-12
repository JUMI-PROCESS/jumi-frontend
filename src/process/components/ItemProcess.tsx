import React from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import moment from 'moment';

import '../../forms/components/ItemForm.css';
import { ParamsType } from '../utilities/TypeProcess';

type Props = {
    _id?: string;
    name: string;
    date: number;
    type: string;
};

export default function ItemProcess({ _id, name, date, type }: Props) {
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const actions = ParamsType[pathname]['actions'] as Record<string, boolean>;

    const onNavigate = () => {
        if (actions['isFill'])
            navigate(`/procesos/tareas/${_id}`)
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
                    <Link to={`/procesos/modelador/${_id}/?type=${type}`} className="icon">
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
