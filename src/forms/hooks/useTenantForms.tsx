import { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { Form, IForm } from '../domain/Form';
import { SocketContext } from '../../contexts/SocketContext';
import { FormSocket } from '../ports/FormSocket';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { FormRepositoryApi } from '../output.adapaters/FormRepositoryApi';
import { SocketNotification } from '../../output.adapters/SocketNotificacion';
import { ISocket } from '../../output.ports/ISocket';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string;
    limit?: number;
};

export default function useTenantForms({ query, page, paramsExtra, type, limit }: Props) {
    const formRepository: EntityRepository<IForm> = new FormRepositoryApi();
    const formSocket: ISocket = useContext(SocketContext)['form'];

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

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getBy(query, page, 'name', paramsExtra, type, limit);
            setData(res.data);
            setSize((size) => size + 1);
        };
        formSocket.onMessage(fetchData, 'form');

        return () => {
            formSocket.URL.off('form', () => console.log('Disconnect socket'));
        };
    }, []);

    return { data, size };
}
