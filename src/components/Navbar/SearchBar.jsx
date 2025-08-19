import { TextField } from "@mui/material";
import { useDataContext } from "../../context/DataContext";

function SearchBar() {
    const { search, setSearch, darkMode } = useDataContext();

    return (
        <div className="w-full md:flex-1 md:flex md:justify-center">
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search by task title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    width: "100%",
                    maxWidth: 550,
                    input: {
                        color: darkMode ? "#080808" : "#000",
                        backgroundColor: darkMode ? "#fff" : "#f5f5f5",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: darkMode ? "#aaa" : "#020202ff",
                        },
                        "&:hover fieldset": {
                            borderColor: darkMode ? "#fff" : "#555",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: darkMode ? "#aaa" : "#ccc",
                        },
                    },
                }}
            />

        </div>
    );
}

export default SearchBar;
