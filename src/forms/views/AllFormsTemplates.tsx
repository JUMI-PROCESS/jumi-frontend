import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import ListForms from '../components/ListForms';
import useTenantForms from '../hooks/useTenantForms';
import UseTenantFormsTemplates from '../hooks/useTenantFormsTemplates';
import { ParamsType } from '../utilities/TypeForm';

type Props = {};

export default function AllFormsTemplates({}: Props) {
    const formRepository: EntityRepository = useContext(RepositoryContext)['formTemplate'];

    const { pathname } = useLocation();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = UseTenantFormsTemplates({
        query,
        page,
        paramsExtra: ParamsType[pathname]['params'] as Array<string>,
        type: ParamsType[pathname]['type'] as string,
        limit: 8,
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
