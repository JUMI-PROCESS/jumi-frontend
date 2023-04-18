import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { Form, IForm } from '../domain/Form';
import { SocketContext } from '../../contexts/FormSocketContext';
import { FormSocket } from '../ports/FormSocket';
import { EntityRepository } from '../../output.ports/EntityRepository';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string;
    limit: number
};

export default function UseTenantFormsTemplates({ query, page, paramsExtra, type, limit }: Props) {
    const formRepository: EntityRepository<IForm> = useContext(RepositoryContext)['formTemplate'];
    const formSocket: FormSocket = useContext(SocketContext)['form'];

    const [data, setData] = useState<Array<IForm>>([]);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getCounter(query, 'name', paramsExtra, type);
            setSize(res.data.counter);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getBy(query, page, 'name', paramsExtra, type, limit);
            setData(res.data);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    return { data, size };
}
