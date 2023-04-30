import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EntityRepository } from '../../output.ports/EntityRepository';
import { IForm } from '../domain/Form';
import { FormRepositoryApi } from '../output.adapaters/FormRepositoryApi';
import { FormTemplateRepositoryApi } from '../output.adapaters/FormTemplateRepositoryApi';

type Props = {};

export default function DeleteForm({}: Props) {
    const _id = useParams()['_id'] || '';
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name') || 'ninguno';
    const type = searchParams.get('type') || 'ninguno';

    const navigate = useNavigate();
    const formRepository: EntityRepository<IForm> = new FormRepositoryApi();
    const formTemplateRepository: EntityRepository<IForm> = new FormTemplateRepositoryApi();

    const onDelete = () => {
        if (type == 'todos') {
            formTemplateRepository
                .delete(_id || '')
                .then(() => {
                    toast.success('Formulario eliminado');
                    navigate('/formularios/todos');
                })
                .catch((err) => toast(err));
        }
        if (type == 'tareas') {
            formRepository
                .delete(_id || '')
                .then(() => {
                    toast.success('Formulario eliminado');
                    navigate('/formularios/tareas');
                })
                .catch((err) => toast(err));
        }
    };

    const onCancel = () => {
        if (type == 'todos') navigate('/formularios/todos');
        if (type == 'tareas') navigate('/formularios/tareas');
    };

    return (
        <div className="backg-s2 p-10 d-flex-columns" style={{ gap: '5px' }}>
            <span className="h7">¿Esta seguro que desea eliminar el formulario: {name}?</span>
            <button onClick={onCancel}>NO</button>
            <button onClick={onDelete}>SI</button>
        </div>
    );
}
