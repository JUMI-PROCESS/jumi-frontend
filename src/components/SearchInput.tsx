import React, { useEffect, useState } from 'react';

type Props = {
    query: string;
    setQuery: Function;
};

export default function SearchInput({ query, setQuery }: Props) {
    const onChange = (e) => {
        const { value } = e.target;
        setQuery(value);
    };

    return (
        <div className='input-icon justify-self-end'>
            <input type="text" name="" value={query} id="" onChange={onChange} />
            <span>&#9740;</span>
        </div>
    );
}
