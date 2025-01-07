import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import axios from "axios";

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(
            `https://taskmanagement-3g2s.onrender.com/api/v1/getTask/${taskId}`
          );
          setTask(response.data);
        } catch (error) {
          console.error("Error fetching task:", error);
          toast.error("Failed to load task details.");
        }
      };

      fetchTask();
    }
  }, [taskId]);

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(
        `https://taskmanagement-3g2s.onrender.com/api/v1/createTask`,
        task
      );
      toast.success("Task created successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
        <span>
          <i className="ri-add-circle-line text-blue-500"></i>
        </span>
        Add a New Task
      </h1>
      <p className="text-gray-600 mt-2 text-sm text-center pb-2">
        Organize your tasks effectively and stay on top of your priorities.
      </p>

      <TaskForm onSubmit={handleAddTask} initialTask={task} />
    </div>
  );
}
