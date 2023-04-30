import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import ListProcess from '../components/ListProcesses';
import { IInstance } from '../domain/Process';
import useInstances from '../hooks/useInstances';
import { ParamsType } from '../utilities/TypeProcess';

// import { FormSocket } from '../ports/FormSocket';

type Props = {};

export default function AllInstances({}: Props) {
    const { pathname } = useLocation();
    const processRepository: EntityRepository<IInstance> = useContext(RepositoryContext)['instance'];

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = useInstances({
        query,
        page,
        paramsExtra: ParamsType[pathname]['params'] as Array<string>,
        type: ParamsType[pathname]['type'] as string,
    });
    useEffect(() => {
        setPage(0);
    }, [query, pathname]);

    if (!data) {
        return <span>Loading...</span>;
    }

    return (
        <ListProcess
            data={data.map((item) => {
                return { ...item, name: item.processDefinitionName };
            })}
            query={query}
            setQuery={setQuery}
            page={page}
            setPage={setPage}
            limit={processRepository.limit}
            size={size}
            type={'instanciados'}
        />
    );
}
