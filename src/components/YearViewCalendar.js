import React from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const YearViewCalendar = ({ year, events, onMonthClick }) => {
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {months.map((monthName, monthIdx) => {
        const daysInMonth = getDaysInMonth(monthIdx, year);
        const firstDay = new Date(year, monthIdx, 1).getDay();

        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let d = 1; d <= daysInMonth; d++) days.push(d);

        return (
          <div
            key={monthIdx}
            className="border rounded p-2 bg-white dark:bg-gray-900"
          >
            <div
              onClick={() => onMonthClick(monthIdx)}
              className="text-center font-bold text-blue-600 cursor-pointer mb-2"
            >
              {monthName}
            </div>
            <div className="grid grid-cols-7 text-[10px] text-center font-semibold mb-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] text-center">
              {days.map((day, i) => (
                <div
                  key={i}
                  className="h-5"
                  style={{ backgroundColor: getColorForDay(events, year, monthIdx, day) }}
                >
                  {day || ""}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function getColorForDay(events, year, month, day) {
  if (!day) return "transparent";
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const event = events.find((e) => e.date === dateStr);
  return event?.color || "transparent";
}

export default YearViewCalendar;
