import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { useLocation } from 'react-router-dom';

import useTenantProcesses from '../hooks/useTenantProcesses';
import ListProcess from '../components/ListProcesses';
import { ParamsType } from '../utilities/TypeProcess';
import { EntityRepository } from '../../ports/EntityRepository';
import { IProcess } from '../domain/Process';
// import { FormSocket } from '../ports/FormSocket';

type Props = {};

export default function AllForms({}: Props) {    
    const { pathname } = useLocation();
    const processRepository: EntityRepository<IProcess> = useContext(RepositoryContext)['process'];

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = useTenantProcesses({
        query,
        page,
        paramsExtra: ParamsType[pathname]['params'] as Array<string>,
        type: ParamsType[pathname]['type'] as string
    });    
    
    useEffect(() => {
        setPage(0);
    }, [query]);

    if (!data) {
        return <span>Loading...</span>;
    }

    return (
        <ListProcess
            data={data}
            query={query}
            setQuery={setQuery}
            page={page}
            setPage={setPage}
            limit={processRepository.limit}
            size={size}
        />
    );
}
