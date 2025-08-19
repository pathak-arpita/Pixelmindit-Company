import { useState } from "react";
import SearchBar from "./SearchBar";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDataContext } from "../../context/DataContext";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function Navbar() {
  const { darkMode, setDarkMode, filter, setFilter } = useDataContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) setFilter(value);
  };

  return (
    <div className="p-4 border-b" style={{ backgroundColor: darkMode ? "#2c2c2c" : "#fff",transition: "background-color 0.9s" }} >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:px-8">
        <div className="flex-1 flex items-center md:justify-start justify-between">
          <h1 className="text-2xl font-bold" style={{ color: darkMode ? "#fff" : "#000" }} >
            Mini Kanban Board</h1>

          <div className="flex items-center gap-5 md:hidden">
            <IconButton onClick={handleClick}>
              <FilterListIcon
                sx={{
                  color: darkMode ? "#fff" : "#898989ff",
                  fontSize: 32,
                }}
              />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
              <MenuItem selected={filter === "all"} onClick={() => handleClose("all")}>
                All
              </MenuItem>
              <MenuItem selected={filter === "high"} onClick={() => handleClose("high")}>
                High Priority
              </MenuItem>
              <MenuItem selected={filter === "today"} onClick={() => handleClose("today")}>
                Due Today
              </MenuItem>
            </Menu>

            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                color: darkMode ? "#fff" : "#898989ff",
                fontSize: 32,
              }}
              disableRipple
              disableFocusRipple
            >
              {darkMode ? (
                <LightModeOutlinedIcon fontSize="large" />
              ) : (
                <DarkModeOutlinedIcon fontSize="large" />
              )}
            </IconButton>

          </div>
        </div>

        <SearchBar />

        <div className="hidden md:flex flex-1 justify-end items-center gap-5">
          <IconButton onClick={handleClick}>
            <FilterListIcon
              sx={{ color: darkMode ? "#fff" : "#898989ff", fontSize: 32 }}
            />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem selected={filter === "all"} onClick={() => handleClose("all")}>
              All
            </MenuItem>
            <MenuItem selected={filter === "high"} onClick={() => handleClose("high")}>
              High Priority
            </MenuItem>
            <MenuItem selected={filter === "today"} onClick={() => handleClose("today")}>
              Due Today
            </MenuItem>
          </Menu>

          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{ color: darkMode ? "#fff" : "#898989ff", fontSize: 32 }}
            disableRipple
            disableFocusRipple
          >
            {darkMode ? (
              <LightModeOutlinedIcon fontSize="large" />
            ) : (
              <DarkModeOutlinedIcon fontSize="large" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
