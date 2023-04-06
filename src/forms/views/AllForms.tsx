import React, { useState, useEffect, useContext } from 'react';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { FormRepository } from '../ports/FormRepository';

import useTenantForms from '../hooks/useTenantForms';
import ListForms from '../components/ListForms';

type Props = {};

export default function AllForms({}: Props) {
    const formRepository: FormRepository = useContext(RepositoryContext)['form'];

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const { data, size } = useTenantForms({ query, page });

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
