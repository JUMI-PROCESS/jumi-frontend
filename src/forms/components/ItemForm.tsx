import moment from 'moment';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { UserContext } from '../../contexts/UserContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { Form, IForm } from '../domain/Form';
import { ParamsType } from '../utilities/TypeForm';
import './ItemForm.css';

type Props = {
    _id?: string;
    name: string;
    date: number;
};

export default function ItemForm({ _id, name, date }: Props) {
    const navigate = useNavigate();
    const user: Record<string, any> = useContext(UserContext);
    const formRepository: EntityRepository<IForm> = useContext(RepositoryContext)['form'];
    const formTemplateRepository: EntityRepository<IForm> = useContext(RepositoryContext)['formTemplate'];

    const { pathname } = useLocation();
    const actions = ParamsType[pathname]['actions'] as Record<string, boolean>;

    const onNavigate = () => {
        if (actions['isFill']) navigate(`/formularios/tareas/${_id}`);
        else if (actions['isAssigned']) {
            formTemplateRepository
                .getById(_id || '')
                .then((data) => {
                    const form = data.data;
                    form['assignedUser'] = user['user_id'];
                    formRepository
                        .save(new Form(data.data))
                        .then((data_) => {
                            navigate(`/formularios/tareas/${data_.data._id}`);
                        })
                        .catch((err) => toast(err));
                })
                .catch((err) => toast(err));
        }
    };

    return (
        <div className="target py-20" onClick={onNavigate}>
            <div className="target-info">
                <span className="h3">{name}</span>
                <span className="h4-sub">{moment(date).format('ddd DD MMM YYYY HH:mm:ss')}</span>
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
