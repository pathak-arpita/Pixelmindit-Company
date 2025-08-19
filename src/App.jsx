import Board from "./components/Board";
import Navbar from "./components/Navbar/Navbar";
import { useDataContext } from "./context/DataContext";

function App() {
  const { darkMode } = useDataContext();
  return (
    <div style={{
      minHeight: "100vh", backgroundColor: darkMode ? "#000000" : "#f4f2ee", transition: "background-color 0.9s"
    }}>
      <Navbar />
      {/* <Board tasks={tasks} setTasks={setTasks} /> */}
    </div>
  );
}

export default App;
