import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md"; // Delete and Edit icons
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";

export default function TaskTable({ tasks, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const data = [
    {
      all: 10,
      painding: 5,
      rejeted: 3,
      accepted: 9,
    },
  ];
  const handleEditTask = (task) => {
    console.log("ilyas", task);

    navigate(`/editTask/${task._id}`, { state: { task } });
  };

  return (
    <div className="w-full h-full lg:p-10 p-2 ">
      <div className="text-center space-y-2">
        <h5 className="text-2xl font-extrabold text-indigo-600">
          Welcome to Your Task Manager
        </h5>
        <p className="text-[16px] text-gray-500">
          Manage, organize, and track your tasks with ease!
        </p>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Task List</h2>
        <div
          onClick={() => navigate("/addTask")}
          className="cursor-pointer  px-6 py-3 rounded-lg border  flex items-center justify-center "
        >
          <span className=" font-medium pr-1">Add Task</span>
          <IoAddCircle size={20} />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-2  gap-4 py-4">
        {data.map((item, index) => (
          <>
            <div className="bg-blue-500 text-white rounded-lg p-4 text-center shadow-lg">
              <h3> Total {item.all}</h3>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg p-4 text-center shadow-lg">
              <p>Pending: {item.painding}</p>
            </div>
            <div className="bg-red-500 text-white rounded-lg p-4 text-center shadow-lg">
              <p>Rejected: {item.rejeted}</p>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-4 text-center shadow-lg">
              <p>Accepted: {item.accepted}</p>
            </div>
          </>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 w-full lg:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 w-full lg:w-1/4"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto ">
        <table className="hidden lg:table table-auto border p-2  w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2 font-medium text-gray-600">Title</th>
              <th className="border-b p-2 font-medium text-gray-600">
                Description
              </th>
              <th className="border-b p-2 font-medium text-gray-600">Status</th>
              <th className="border-b p-2 font-medium text-gray-600">
                Due Date
              </th>
              <th className="border-b p-2 font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto h-10 ">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b p-2">{task.title}</td>
                  <td className="border-b p-2">{task.description || "-"}</td>
                  <td
                    className={`border-b p-2 ${
                      task.status === "Completed"
                        ? "text-green-400"
                        : task.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className="border-b p-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border-b p-2 flex space-x-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => onDelete(task._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No tasks found. Try adjusting your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="lg:hidden">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 text-sm">
                  {task.description || "No description"}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Status:</span> {task.status}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Due Date:</span>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-4 text-gray-500">
              No tasks found. Try adjusting your search or filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
