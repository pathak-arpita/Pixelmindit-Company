import { useDataContext } from "../../../context/DataContext";

const ProgressBar = () => {
    const { tasks, darkMode } = useDataContext();

    const total = tasks.length;
    const done = tasks.filter((task) => task.status === "Finish").length;
    const inProgress = tasks.filter((task) => task.status === "In Progress").length;

    const percentage = total ? ((done + inProgress * 0.2) / total) * 100 : 0;

    return (
        <div className="flex items-center justify-center mt-5 w-full">
            <span className={`mr-3 font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                ProgressBar
            </span>
            <div className="relative w-[70%] bg-gray-300 h-5 rounded overflow-hidden" style={{border: `1.5px solid ${darkMode ? "#fff" : "#000"}`,}}>
                <div
                    className="h-full transition-all flex items-center justify-center font-bold"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: "#379837",
                        color: darkMode ? "#fff" : "#000",
                    }}
                >
                    {percentage > 0 && `${Math.round(percentage)}%`}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;