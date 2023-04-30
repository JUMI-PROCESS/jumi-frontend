import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EntityRepository } from '../../output.ports/EntityRepository';
import { IDeployment, IProcess } from '../domain/Process';
import { DeploymentRepositoryApi } from '../output.adapters/DeploymentRepositoryApi';
import { ProcessRepositoryApi } from '../output.adapters/ProcessRepositoryApi';

type Props = {};

export default function DeleteProcess({}: Props) {
    const _id = useParams()['_id'] || '';
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name') || 'ninguno';
    const type = searchParams.get('type') || 'ninguno';

    const navigate = useNavigate();
    const processRepository: EntityRepository<IProcess> = new ProcessRepositoryApi();
    const deploymentRepository: EntityRepository<IDeployment> = new DeploymentRepositoryApi();

    const onDelete = () => {
        if (type == 'procesos') {
            processRepository
                .delete(_id || '')
                .then(() => {
                    toast.success('Proceso eliminado');
                    navigate('/procesos/guardados');
                })
                .catch((err) => toast(err));
        }
        if (type == 'desplegados') {
            deploymentRepository
                .delete(_id || '')
                .then(() => {
                    toast.success('Despliegue eliminado');
                    navigate('/procesos/desplegados');
                })
                .catch((err) => toast(err));
        }
    };

    const onCancel = () => {
        if (type == 'procesos') navigate('/procesos/guardados');
        if (type == 'desplegados') navigate('/procesos/desplegados');
    };

    console.log(type)

    return (
        <div className="backg-s2 p-10 d-flex-columns" style={{ gap: '5px' }}>
            <span className="h7">¿Esta seguro que desea eliminar el proceso: {name}?</span>
            <button onClick={onCancel}>NO</button>
            <button onClick={onDelete}>SI</button>
        </div>
    );
}
