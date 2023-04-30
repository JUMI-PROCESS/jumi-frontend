import moment from 'moment';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { UserContext } from '../../contexts/UserContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { Notification_, INotification } from '../domain/Notification';
// import { ParamsType } from '../utilities/TypeForm';
import './ItemNotification.css';

type Props = {
    _id?: string;
    name: string;
    date: number | string;
};

export default function ItemForm({ _id, name, date }: Props) {
    const user: Record<string, any> = useContext(UserContext);

    const { pathname } = useLocation();
    const type = pathname.startsWith('/formularios/tareas') ? 'tareas' : 'todos';

    return (
        <div className="target py-20" style={{width: '130px'}}>
            <div className="target-info">
                <span className="h7">{name}</span>
                <span className="h4-sub">{moment(date).format('ddd DD MMM YYYY HH:mm:ss')}</span>
            </div>
        </div>
    );
}
