import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";
import { toast } from "react-toastify";
const EditTaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {};

  const [taskData, setTaskData] = useState(
    task || {
      title: "",
      description: "",
      status: "",
      dueDate: "",
    }
  );

  useEffect(() => {
    if (!task) {
      navigate("/");
    }
  }, [task, navigate]);

  const handleEditTask = async (task) => {
    try {
      const response = await axios.put(
        `https://taskmanagement-3g2s.onrender.com/api/v1/updateTask/${task._id}`,
        task
      );

      toast.success("Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error editing task:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
        <span>
          <i className="ri-add-circle-line text-blue-500"></i>
        </span>
        Edit Task
      </h1>
      <p className="text-gray-600 mt-2 text-sm text-center pb-2">
        Organize your tasks effectively and stay on top of your priorities.
      </p>
      <TaskForm onSubmit={handleEditTask} initialTask={taskData} />
    </div>
  );
};

export default EditTaskPage;
