import { useState } from "react";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterPanel({ filter, setFilter, search, setSearch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) setFilter(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 ">
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
         sx={{ width: 250 }}
      />
       <IconButton
        onClick={handleClick}
        sx={{ color: "#555" }}
      >
        <FilterListIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem
          selected={filter === "all"}
          onClick={() => handleClose("all")}
        >
          All
        </MenuItem>
        <MenuItem
          selected={filter === "high"}
          onClick={() => handleClose("high")}
        >
          High Priority
        </MenuItem>
        <MenuItem
          selected={filter === "today"}
          onClick={() => handleClose("today")}
        >
          Due Today
        </MenuItem>
      </Menu>
    </div>
  );
}
