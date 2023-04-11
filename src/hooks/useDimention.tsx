import React, { useState, useEffect } from 'react';

export const useDimention = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setWidth]);

    return { width };
};
