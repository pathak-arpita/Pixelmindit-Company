import { TextField } from "@mui/material";

export default function SearchBar({ search, setSearch, darkMode }) {
  return (
    <div className="w-full md:flex-1 md:flex md:justify-center">
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: "100%",
          maxWidth: 550,
          input: { color: darkMode ? "#fff" : "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: darkMode ? "#aaa" : "#ccc",
            },
            "&:hover fieldset": {
              borderColor: darkMode ? "#fff" : "#555",
            },
          },
        }}
      />
    </div>
  );
}
