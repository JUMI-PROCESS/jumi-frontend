import {useState, useEffect, useContext} from 'react'
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

type Props = {
    query: string,
    page: number,
}

export default function UseTenantForms({query, page}: Props) {
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];

    const [data, setData] = useState<[Form] | null>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsCounter('quimica', query, 'name');
            setSize(res.data.counter);
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica', query, page, 'name');
            setData(res.data);
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await formRepository.getFormsByTenant('quimica', query, page, 'name');
            setData(res.data);
        };

        fetchData();
    }, [page]);

    return {data, size, page};
}