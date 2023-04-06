import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
};

export default function UseTenantForms({ query, page, paramsExtra }: Props) {
    const userContext: Record<string, any> = useContext(UserContext);
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];

    const [data, setData] = useState<[Form] | null>(null);
    const [size, setSize] = useState(0);

    console.log(paramsExtra);

    useEffect(() => {
        formRepository.setConfig({ token: `${userContext['token']}` });
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsCounter(query, 'name', paramsExtra);
            setSize(res.data.counter);
        };

        fetchData();
    }, [query, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsBy(query, page, 'name', paramsExtra);
            setData(res.data);
        };

        fetchData();
    }, [query, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        console.log('REFRESCANDO HOOK');
        const fetchData = async () => {
            const res = await formRepository.getFormsBy(query, page, 'name', paramsExtra);
            setData(res.data);
        };

        fetchData();
    }, [page, JSON.stringify(paramsExtra)]);

    return { data, size };
}
