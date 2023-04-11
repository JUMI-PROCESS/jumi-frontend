import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { Form, IForm } from '../domain/Form';
import { SocketContext } from '../../contexts/FormSocketContext';
import { FormSocket } from '../ports/FormSocket';
import { EntityRepository } from '../../ports/EntityRepository';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string;
};

export default function UseTenantForms({ query, page, paramsExtra, type }: Props) {
    const userContext: Record<string, any> = useContext(UserContext);
    const formRepository: EntityRepository<IForm> = useContext(RepositoryContext)['form'];
    const formSocket: FormSocket = useContext(SocketContext)['form'];

    const [data, setData] = useState<Array<IForm>>([]);
    const [size, setSize] = useState(0);

    useEffect(() => {
        formRepository.setConfig({ token: `${userContext['token']}` });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getCounter(query, 'name', paramsExtra, type);
            setSize(res.data.counter);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getBy(query, page, 'name', paramsExtra, type);
            setData(res.data);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async (data_: IForm) => {
            const res = await formRepository.getBy(query, page, 'name', paramsExtra, type);
            setData(res.data);
            setSize((size) => size + 1);

            new Notification('JUMI', { body: 'Se agrego un nuevo formulario' });
        };
        formSocket.onForm(fetchData);

        return () => {
            formSocket.URL.off('signal', fetchData);
        };
    }, [query, page, JSON.stringify(paramsExtra), type]);

    return { data, size };
}
