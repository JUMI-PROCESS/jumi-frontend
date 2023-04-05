import React from 'react';

type Props = {
    limit: number;
    size: number;
    page: number;
    setPage: Function;
};

export default function SearchInput({ limit, size, page, setPage }: Props) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPage(value);
    };

    const onNext = (iter: number) => {
        const next = page + iter;
        if (next > -1 && next <= Math.floor((size - 1) / limit))
            setPage(page + iter);
    };

    return (
        <div className="paginator justify-self-end">
            <span onClick={() => setPage(0)}>&#8249;&#8249;</span>
            <span onClick={() => onNext(-1)}>&#8249;</span>
            <input type="number" name="" value={page} id="" onChange={onChange} />
            <span onClick={() => onNext(1)}>&#8250;</span>
            <span onClick={() => setPage(Math.floor((size - 1) / limit))}>&#8250;&#8250;</span>
        </div>
    );
}
