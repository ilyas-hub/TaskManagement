import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTaskPage from "./components/AddTaskPage";
import ViewTasksPage from "./pages/ViewTasksPage";
import EditTaskPage from "./components/EditTaskPage";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col font-roboto">
      <Routes>
        <Route path="/" element={<ViewTasksPage/>} />
        <Route path="/addTask" element={<AddTaskPage />} />
        <Route path="/editTask/:id" element={<EditTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
