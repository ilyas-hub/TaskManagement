import React, { useState, useEffect } from "react";
import TaskTable from "../components/TaskTable";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
export default function ViewTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://taskmanagement-3g2s.onrender.com/api/v1/getTasks`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(
        `https://taskmanagement-3g2s.onrender.com/api/v1/deleteTask/${id}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-[90%] h-[calc(100vh-80px)] mt-10 mb-10 flex justify-center border rounded-lg shadow-lg">
      <div className="w-[20%]">
        <Sidebar></Sidebar>
      </div>
      <div className="w-[80%]">
  
        <TaskTable tasks={tasks} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
}
