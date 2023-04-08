import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';
import { SocketContext } from '../../contexts/FormSocketContext';
import { FormSocket } from '../ports/FormSocket';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string
};

export default function UseTenantForms({ query, page, paramsExtra, type }: Props) {
    const userContext: Record<string, any> = useContext(UserContext);
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];
    const formSocket: FormSocket = useContext(SocketContext)['form'];

    const [data, setData] = useState<[Form] | null>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        formRepository.setConfig({ token: `${userContext['token']}` });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsCounter(query, 'name', paramsExtra, type);
            setSize(res.data.counter);
        };

        fetchData();
    }, [query, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsBy(query, page, 'name', paramsExtra, type);
            setData(res.data);
        };

        fetchData();
    }, [query, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        console.log('REFRESCANDO HOOK');
        const fetchData = async () => {
            const res = await formRepository.getFormsBy(query, page, 'name', paramsExtra, type);
            setData(res.data);
        };

        fetchData();
    }, [page, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsBy(query, page, 'name', paramsExtra, type);
            setData(res.data);
        };
          formSocket.onForm(fetchData);
    
      return () => {
        formSocket.URL.off('signal', fetchData);
      }
    }, [])

    return { data, size };
}
