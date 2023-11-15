import React, { createContext, useContext, useState, useEffect } from 'react';

const MarginContext = createContext();

export function MarginProvider({ children }) {
    const [margin, setMargin] = useState(0);

    useEffect(() => {
        // You can perform actions based on changes in the margin variable here
        console.log(`Margin has changed: ${margin}`);
    }, [margin]);

    const value = { margin, setMargin };

    return <MarginContext.Provider value={value}>{children}</MarginContext.Provider>;
}

export function useMargin() {
    return useContext(MarginContext);
}
