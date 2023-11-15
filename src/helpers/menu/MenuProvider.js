import React, { createContext, useContext, useEffect, useState } from 'react';

const MenuContext = createContext();

export function MenuProvider({ children }) {
    // Check if the selectedMenu is available in localStorage
    const storedMenu = localStorage.getItem('selectedMenu');
    const [selectedMenu, setSelectedMenu] = useState(storedMenu || 'Dashboard');

    useEffect(() => {
        // Save the selectedMenu to localStorage whenever it changes
        localStorage.setItem('selectedMenu', selectedMenu);
    }, [selectedMenu]);

    const value = {
        selectedMenu,
        setSelectedMenu,
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
    return useContext(MenuContext);
}
