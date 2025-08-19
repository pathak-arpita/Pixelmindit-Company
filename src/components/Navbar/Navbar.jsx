import { useState } from "react";
import SearchBar from "./SearchBar";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDataContext } from "../../context/DataContext";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';

function Navbar() {
  const { darkMode, setDarkMode, filter, setFilter } = useDataContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const filterNames = {
    all: "All Tasks",
    high: "High Priority",
    today: "Due Today",
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (value) => {
    if (value) setFilter( filterNames[value]);
    setAnchorEl(null);
    
  };

  return (
    <div className="p-4 border-b" style={{ backgroundColor: darkMode ? "#2c2c2c" : "#fff", transition: "background-color 0.9s" }} >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:px-8">
        <div className="flex-1 flex items-center md:justify-start justify-between">
          <h1 className="text-2xl font-bold" style={{ color: darkMode ? "#fff" : "#000" }} >
            Mini Kanban Board</h1>

          <div className="flex items-center gap-5 md:hidden">
            <div className="flex flex-col items-center">
              <IconButton onClick={handleClick}>
                <FilterAltIcon sx={{ color: darkMode ? "#fff" : "#898989ff", fontSize: 32 }} />
              </IconButton>
              <span style={{ fontSize: 12, color: darkMode ? "#fff" : "#555" }}>{filterNames[filter]}</span>
            </div>

            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
              <MenuItem selected={filter === "all"} onClick={() => handleClose("all")}>All Tasks</MenuItem>
              <MenuItem selected={filter === "high"} onClick={() => handleClose("high")}>High Priority</MenuItem>
              <MenuItem selected={filter === "today"} onClick={() => handleClose("today")}>Due Today</MenuItem>
            </Menu>

            {/* Dark/Light Mode Icon with name */}
            <div className="flex flex-col items-center">
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{ color: darkMode ? "#fff" : "#898989ff", fontSize: 32 }}
                disableRipple
                disableFocusRipple
              >
                {darkMode ? <LightModeIcon fontSize="large" /> : <BedtimeIcon fontSize="large" />}
              </IconButton>
              <span style={{ fontSize: 12, color: darkMode ? "#fff" : "#555" }}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </div>
          </div>
        </div>

        <SearchBar />

        <div className="hidden md:flex flex-1 justify-end items-center gap-5">
          {/* Filter Icon with selected filter name */}
          <div className="flex flex-col items-center">
            <IconButton onClick={handleClick}>
              <FilterAltIcon sx={{ color: darkMode ? "#fff" : "#898989ff", fontSize: 32 }} />
            </IconButton>
            <span style={{ fontSize: 12, color: darkMode ? "#fff" : "#555" }}>{filter}</span>
          </div>

          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem selected={filter === "all"} onClick={() => handleClose("all")}>All</MenuItem>
            <MenuItem selected={filter === "high"} onClick={() => handleClose("high")}>High Priority</MenuItem>
            <MenuItem selected={filter === "today"} onClick={() => handleClose("today")}>Due Today</MenuItem>
          </Menu>

          {/* Dark/Light Mode Icon with name */}
          <div className="flex flex-col items-center">
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: darkMode ? "#fff" : "#898989ff", fontSize: 32 }}
              disableRipple
              disableFocusRipple
            >
              {darkMode ? <LightModeIcon fontSize="large" /> : <BedtimeIcon fontSize="large" />}
            </IconButton>
            <span style={{ fontSize: 12, color: darkMode ? "#fff" : "#555" }}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;