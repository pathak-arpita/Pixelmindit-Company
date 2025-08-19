import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Board from "./components/Board";
import FilterPanel from "./components/FilterPanel";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("dark-mode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <Board tasks={tasks} setTasks={setTasks} filter={filter} search={search} darkMode={darkMode} />
    </div>
  );
}

export default App;
