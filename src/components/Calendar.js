import React from "react";

const Calendar = ({ currentDate, events, onDayClick }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // Fill initial empty slots before 1st day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Fill days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const formatDate = (day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const todayStr = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  return (
    <div className="grid grid-cols-7 gap-2 mt-4">
      {/* Weekday labels */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
        <div
          key={d}
          className={`text-center font-semibold ${
            i === 0 || i === 6
              ? "text-orange-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {d}
        </div>
      ))}

      {/* Calendar cells */}
      {days.map((day, index) => {
        const dateStr = day ? formatDate(day) : null;
        const dayEvents = events.filter((e) => e.date === dateStr);
        const isToday = dateStr === todayStr;

        return (
          <div
            key={index}
            className={`border border-gray-300 dark:border-gray-700 rounded p-2 min-h-[80px] ${
              day
                ? "cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                : "bg-white dark:bg-transparent"
            }`}
            onClick={() => day && onDayClick(dateStr)}
          >
            {day && (
              <div
                className={`text-sm font-bold mb-1 inline-block px-2 py-1 rounded-full ${
                  isToday
                    ? "bg-violet-500 text-white"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {day}
              </div>
            )}

            {dayEvents.map((event, idx) => (
          <div
            key={idx}
            className="text-black text-xs px-2 py-1 rounded mb-1 truncate"
            style={{ backgroundColor: event.color || "#3b82f" }}
            title={`${event.title} at ${event.time}`}
          >
            {event.title}
          </div>
        ))}

          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
