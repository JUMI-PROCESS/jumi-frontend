import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { useLocation } from 'react-router-dom';

import useTenantNotifications from '../hooks/useTenantNotifications';
import ListNotifications from '../components/ListNotifications';
import { EntityRepository } from '../../output.ports/EntityRepository';

type Props = {};

export default function AllNotifications({}: Props) {
    // const formRepository: EntityRepository = useContext(RepositoryContext)['notification'];

    const { pathname } = useLocation();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = useTenantNotifications({
        query,
        page,
        paramsExtra: ['owner'] as Array<string>,
        type: '' as string,
        limit: 4
    });    
    
    useEffect(() => {
        setPage(0);
    }, [query, pathname]);

    if (!data) {
        return <span>Loading...</span>;
    }

    return (
        <ListNotifications
            data={data}
            query={query}
            setQuery={setQuery}
            page={page}
            setPage={setPage}
            limit={4}
            size={size}
        />
    );
}
