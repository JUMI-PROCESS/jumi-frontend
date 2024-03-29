import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { useLocation } from 'react-router-dom';

import useTenantForms from '../hooks/useTenantForms';
import ListForms from '../components/ListForms';
import { ParamsType } from '../utilities/TypeForm';
import { EntityRepository } from '../../output.ports/EntityRepository';

type Props = {};

export default function AllForms({}: Props) {
    const formRepository: EntityRepository = useContext(RepositoryContext)['form'];

    const { pathname } = useLocation();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = useTenantForms({
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
        <ListForms
            data={data}
            query={query}
            setQuery={setQuery}
            page={page}
            setPage={setPage}
            limit={formRepository.limit}
            size={size}
        />
    );
}
