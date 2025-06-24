import React, { useState, useEffect } from "react";

const AddEventForm = ({ onAdd, onClose, events, eventToEdit }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      const [h, m] = eventToEdit.time.split(":");
      setHour(h.padStart(2, "0"));
      setMinute(m.slice(0, 2));
      setAmPm(m.slice(3)); // AM or PM
      setDuration(eventToEdit.duration || "");
    }
  }, [eventToEdit]);

  const formattedTime = `${hour}:${minute} ${ampm}`;

  const duplicateEventExists = events?.some(
    (event) =>
      event.date === date &&
      event.time === formattedTime &&
      (!eventToEdit || event.title !== eventToEdit.title)
  );

  const isPastDate = (inputDateStr) => {
    const inputDate = new Date(inputDateStr);
    inputDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
  };

  const isPast = date && isPastDate(date);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (duplicateEventExists || isPast) return;

    if (title && date && hour && minute) {
      const newEvent = {
        title,
        date,
        time: formattedTime,
        duration,
      };
      onAdd(newEvent);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          {eventToEdit ? "Edit Event" : "Add New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />

          <input
            type="date"
            value={date}
            min={todayStr}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />

          {/* Time Picker */}
          <div className="flex gap-2">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="border p-2 rounded w-1/3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const val = String(i + 1).padStart(2, "0");
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>

            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="border p-2 rounded w-1/3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {["00", "15", "30", "45"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={ampm}
              onChange={(e) => setAmPm(e.target.value)}
              className="border p-2 rounded w-1/3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Duration (e.g. 1h)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />

          {duplicateEventExists && (
            <p className="text-red-500 text-sm mt-1">
              ⚠️ An event already exists at this time.
            </p>
          )}

          {isPast && (
            <p className="text-red-500 text-sm mt-1">
              ⚠️ Cannot add events to past dates.
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 bg-gray-300 dark:bg-blue-700 dark:text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded"
              disabled={duplicateEventExists || isPast}
            >
              {eventToEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
