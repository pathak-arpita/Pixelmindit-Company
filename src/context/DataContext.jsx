import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    // Dark Mode
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("dark-mode")) || false;
    });

    useEffect(() => {
        localStorage.setItem("dark-mode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Filters
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    // Tasks with persistence
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("kanban-tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    }, [tasks]);
    return (
        <DataContext.Provider value={{ darkMode, setDarkMode, filter, setFilter, search, setSearch, tasks, setTasks }}>
            {children}
        </DataContext.Provider>
    );
}


export function useDataContext() {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useDataContext must be used inside DataProvider");
    return ctx;
}
