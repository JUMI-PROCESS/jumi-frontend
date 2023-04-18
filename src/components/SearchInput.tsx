import React from 'react';

type Props = {
    query: string;
    setQuery: Function;
};

export default function SearchInput({ query, setQuery }: Props) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setQuery(value);
    };

    return (
        <div className='search justify-self-end'>
            <input type="text" name="" value={query} id="" onChange={onChange} />
            <span>&#9740;</span>
        </div>
    );
}
