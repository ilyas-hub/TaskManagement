import React, { useState } from "react";
import {
  FaHome,
  FaTasks,
  FaUserAlt,
  FaChartBar,
  FaCog,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden absolute top-4 left-4 text-white bg-[#022213] p-2 rounded-md"
      >
        <FaBars size={20} />
      </button>

      <div
        className={`bg-[#022213] rounded-l-lg h-full text-white px-4 py-6 absolute lg:static transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
      >
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 hover:bg-[#024924] p-2 rounded-md cursor-pointer">
            <FaHome />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#024924] p-2 rounded-md cursor-pointer">
            <FaTasks />
            <span>Tasks</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#024924] p-2 rounded-md cursor-pointer">
            <FaUserAlt />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#024924] p-2 rounded-md cursor-pointer">
            <FaChartBar />
            <span>Reports</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#024924] p-2 rounded-md cursor-pointer">
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
