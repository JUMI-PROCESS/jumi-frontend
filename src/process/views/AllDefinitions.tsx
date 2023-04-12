import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import ListProcess from '../components/ListProcesses';
import { IProcess as IDefinition } from '../domain/Process';
import UseDefinitions from '../hooks/useDefinitions';
import { ParamsType } from '../utilities/TypeProcess';

// import { FormSocket } from '../ports/FormSocket';

type Props = {};

export default function AllDefinitions({}: Props) {
    const { pathname } = useLocation();
    const processRepository: EntityRepository<IDefinition> = useContext(RepositoryContext)['definition'];

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = UseDefinitions({
        query,
        page,
        paramsExtra: ParamsType[pathname]['params'] as Array<string>,
        type: ParamsType[pathname]['type'] as string,
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
            type={'definiciones'}
        />
    );
}
