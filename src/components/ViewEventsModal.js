import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ViewEventsModal = ({ events, date, onClose, onDelete, onEdit }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Events on {date}
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No events for this day.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{event.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {event.time} {event.duration ? `(${event.duration})` : ""}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-gray-500 hover:text-blue-700"
                  onClick={() => onEdit(event)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-gray-500 hover:text-red-700"
                  onClick={() => onDelete(event)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEventsModal;
