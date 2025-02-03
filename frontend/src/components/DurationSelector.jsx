import React from "react";

const DurationSelector = ({
  availableDurations,
  selectedDuration,
  onDurationChange,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Select Duration</h3>
      <div className="flex justify-center space-x-4 mt-2">
        {availableDurations.map((duration) => (
          <button
            key={duration}
            onClick={() => onDurationChange(duration)}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              selectedDuration === duration
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-blue-300"
            } transition`}
          >
            {duration}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;
