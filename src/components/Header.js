import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ currentDate, setCurrentDate, setShowForm, isDarkMode, setIsDarkMode }) => {
  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth()));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-2 sm:gap-3 mb-4">
      {/* Dropdowns and Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Month-Year Dropdowns */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-[140px] focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-[120px] focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Navigation + Add Event + Dark Mode */}
        <div className="flex items-center gap-3 justify-start sm:justify-end">
          <button
            onClick={handlePrev}
            className="p-2 bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-300 border border-violet-500 rounded-full shadow hover:bg-violet-100 dark:hover:bg-gray-600 transition"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-300 border border-violet-500 rounded-full shadow hover:bg-violet-100 dark:hover:bg-gray-600 transition"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm bg-violet-500 text-white rounded hover:bg-violet-600 transition shadow"
          >
            + Add Event
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* ✅ Today Date Display */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-200 pl-1">
        <CalendarDaysIcon className="h-5 w-5 text-pink-800 dark:text-pink-500" />
        <span>Today: {formattedToday}</span>
      </div>
    </div>
  );
};

export default Header;
