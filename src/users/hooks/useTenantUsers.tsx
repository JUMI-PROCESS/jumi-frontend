import { useContext, useEffect, useState } from 'react';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IUser } from '../domain/user';
import { UserRepositoryApi } from '../output.adapters/UserRepositoryApi';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string;
    limit?: number;
};

export default function useTenantUsers({ query, page, paramsExtra, type, limit }: Props) {
    const userRepository: EntityRepository<IUser> = new UserRepositoryApi();

    const [data, setData] = useState<Array<IUser>>([]);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await userRepository.getCounter(query, 'name', paramsExtra, type);
            setSize(res.data.counter);
        };

        // fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await userRepository.getBy(query, page, 'name', paramsExtra, type, limit);
            setData(res.data);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    return { data, size };
}
