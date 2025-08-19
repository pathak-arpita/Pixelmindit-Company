import { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    return (
        <DataContext.Provider value={{ darkMode, setDarkMode, filter, setFilter, search, setSearch }}>
            {children}
        </DataContext.Provider>
    );
}


export function useDataContext() {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useDataContext must be used inside DataProvider");
    return ctx;
}
