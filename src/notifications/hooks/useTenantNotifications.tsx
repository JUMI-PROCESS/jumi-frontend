import { useContext, useEffect, useState } from 'react';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { INotification } from '../domain/Notification';
import { NotificationRepositoryApi } from '../output.adapters/NotificationRepositoryApi';
import {useCounter} from '../../store.global';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string;
    limit?: number;
};

export default function useTenantNotifications({ query, page, paramsExtra, type, limit }: Props) {
    const userRepository: EntityRepository<INotification> = new NotificationRepositoryApi();
    const count = useCounter((state) => state.counterNotification);

    const [data, setData] = useState<Array<INotification>>([]);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await userRepository.getCounter(query, 'title', paramsExtra, type);
            setSize(res.data);
            console.log(res)
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra), count]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await userRepository.getBy(query, page, 'title', paramsExtra, type, limit);
            setData(res.data);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra), count]);

    return { data, size };
}
