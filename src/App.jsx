import Board from "./components/Task-Board/Board";
import Navbar from "./components/Navbar/Navbar";
import { useDataContext } from "./context/DataContext";

function App() {
  const { darkMode } = useDataContext();
  return (
    <div style={{
      minHeight: "100vh", backgroundColor: darkMode ? "#000000" : "#f4f2ee", transition: "background-color 0.9s"
    }}>
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
