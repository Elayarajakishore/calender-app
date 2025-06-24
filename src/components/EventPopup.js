
import React from "react";

const EventPopup = ({ selectedDate, events, onClose, onDelete }) => {
  const dayEvents = events.filter(e => e.date === selectedDate);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Events on {selectedDate}</h2>

        {dayEvents.length === 0 ? (
          <p className="text-gray-500">No events for this date.</p>
        ) : (
          dayEvents.map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
            >
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-gray-600">
                  {event.time} ({event.duration})
                </p>
              </div>
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={() => onDelete(event, index)}
              >
                Delete
              </button>
            </div>
          ))
        )}

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
