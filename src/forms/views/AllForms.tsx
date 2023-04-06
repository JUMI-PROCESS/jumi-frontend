import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { FormRepository } from '../ports/FormRepository';
import { useLocation } from 'react-router-dom';

import useTenantForms from '../hooks/useTenantForms';
import ListForms from '../components/ListForms';

const ParamsType: Record<string, Array<string>> = {
    '/formularios/disponibles': ['availableLabels', 'availableUsers'],
    '/formularios/tareas': ['assignedLabel', 'assignedUser'],
    '/formularios/todos': [],
};

type Props = {};

export default function AllForms({}: Props) {
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];
    const { pathname } = useLocation();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = useTenantForms({ query, page, paramsExtra: ParamsType[pathname] });

    useEffect(() => {
        setPage(0);
    }, [query]);

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
