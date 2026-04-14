import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "ADMIN";

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title) return;

        await API.post("/tasks", { title });
        setTitle("");
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="p-4 md:p-6">

                {/* TITLE */}
                <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 mb-6 text-sm md:text-base">
                    Welcome back, {user?.email}
                </p>

                {/* ADD TASK */}
                {isAdmin && (
                    <form
                        onSubmit={handleAddTask}
                        className="mb-6 flex flex-col md:flex-row gap-3"
                    >
                        <input
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                        <button className="bg-purple-500 text-white px-4 py-2 rounded">
                            Add Task
                        </button>
                    </form>
                )}

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatsCard title="Total Projects" count={0} color="bg-purple-400" />
                    <StatsCard title="Total Tasks" count={tasks.length} color="bg-pink-400" />
                    <StatsCard title="Completed Tasks" count={0} color="bg-blue-400" />
                    <StatsCard title="Pending Tasks" count={0} color="bg-yellow-400" />
                </div>

                {/* TASK TABLE */}
                <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">

                    <table className="min-w-[600px] w-full text-left">

                        <thead>
                            <tr className="border-b text-sm md:text-base">
                                <th className="py-2">Task</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assigned</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id} className="border-b text-sm md:text-base">

                                    <td className="py-3">{task.title}</td>

                                    <td>
                                        <select className="border rounded p-1">
                                            <option>To Do</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                    </td>

                                    <td>
                                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs md:text-sm">
                                            High
                                        </span>
                                    </td>

                                    <td>Unassigned</td>

                                    <td className="flex flex-wrap gap-2">

                                        {isAdmin && (
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-sm">
                                                Edit
                                            </button>
                                        )}

                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                Delete
                                            </button>
                                        )}

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;