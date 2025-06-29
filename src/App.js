import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import AddEventForm from "./components/AddEventForm";
import ViewEventsModal from "./components/ViewEventsModal";
import YearViewCalendar from "./components/YearViewCalendar"; // ✅ New import
import "./index.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showYearView, setShowYearView] = useState(false); // ✅ Added

  // 🌙 Dark Mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 💾 Save events to localStorage when they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (newEvent) => {
    if (eventToEdit) {
      const updated = events.map((e) =>
        e.date === eventToEdit.date &&
        e.title === eventToEdit.title &&
        e.time === eventToEdit.time
          ? newEvent
          : e
      );
      setEvents(updated);
      setEventToEdit(null);
    } else {
      setEvents([...events, newEvent]);
    }
    setShowForm(false);
  };

  const handleDayClick = (dateStr) => {
    const eventsForDay = events.filter((e) => e.date === dateStr);
    setSelectedDate(dateStr);
    setSelectedEvents(eventsForDay);
  };

  const handleDeleteEvent = (eventToDelete) => {
    const filtered = events.filter(
      (e) =>
        !(
          e.date === eventToDelete.date &&
          e.title === eventToDelete.title &&
          e.time === eventToDelete.time
        )
    );
    setEvents(filtered);

    if (selectedDate) {
      setSelectedEvents(filtered.filter((e) => e.date === selectedDate));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col justify-start items-center py-10 transition-colors">
      <div className="w-full max-w-5xl p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-orange-400 dark:text-orange-300">
          📅 My Calendar
        </h1>

        <Header
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setShowForm={setShowForm}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setShowYearView={setShowYearView} // ✅ New prop
        />

        {/* 🗓️ Toggle between Year and Month views */}
        {showYearView ? (
          <>
            <YearViewCalendar
              year={currentDate.getFullYear()}
              events={events}
              onMonthClick={(monthIndex) => {
                const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
                setCurrentDate(newDate);
                setShowYearView(false);
              }}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowYearView(false)}
                className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
              >
                Back to Month View
              </button>
            </div>
          </>
        ) : (
          <Calendar
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
          />
        )}
      </div>

      {showForm && (
        <AddEventForm
          onAdd={handleAddEvent}
          onClose={() => {
            setShowForm(false);
            setEventToEdit(null);
          }}
          events={events}
          eventToEdit={eventToEdit}
        />
      )}

      {selectedDate && (
        <ViewEventsModal
          events={selectedEvents}
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onDelete={handleDeleteEvent}
          onEdit={(event) => {
            setSelectedDate(null);
            setEventToEdit(event);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
