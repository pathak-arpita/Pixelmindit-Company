import { TextField } from "@mui/material";
import { useDataContext } from "../../context/DataContext";

function SearchBar() {
    const { search, setSearch, darkMode } = useDataContext();

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

export default SearchBar;
