// src/components/AvailabilityCalendar.js
import React, { useState } from 'react';

import 'tailwindcss/tailwind.css';

const AvailabilityCalendar = ({ availabilityData, checkSlotAvailability }) => {
  const [jobLength, setJobLength] = useState(25);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleJobLengthChange = (e) => {
    setJobLength(Number(e.target.value));
    setSelectedSlots([]); // Reset selected slots when job length changes
  };

  const handleSlotClick = (date, time) => {
    const availabilityStatus = checkSlotAvailability(time, jobLength, date, availabilityData);

    if (availabilityStatus === 'AVAILABLE') {
      const selectedSlotIndex = selectedSlots.findIndex(slot => slot.date === date && slot.time === time);

      if (selectedSlotIndex === -1) {
        // If slot is not already selected, add it
        setSelectedSlots([...selectedSlots, { date, time }]);
      } else {
        // If slot is already selected, remove it
        const updatedSelectedSlots = [...selectedSlots];
        updatedSelectedSlots.splice(selectedSlotIndex, 1);
        setSelectedSlots(updatedSelectedSlots);
      }
    }
  };

  const renderCell = (date, time) => {
    const availabilityStatus = checkSlotAvailability(time, jobLength, date, availabilityData);
    let cellClass = '';

    switch (availabilityStatus) {
      case 'FULL':
        cellClass = 'bg-red-200 cursor-not-allowed';
        break;
      case 'UNAVAILABLE':
        cellClass = 'bg-gray-200 cursor-not-allowed';
        break;
      case 'AVAILABLE':
        cellClass = 'bg-green-200 cursor-pointer';

        // Check if the slot is selected
        if (selectedSlots.some(slot => slot.date === date && slot.time === time)) {
          cellClass += ' selected';
        }
        break;
      default:
        break;
    }

    return (
      <td
        key={`${date}-${time}`}
        className={`p-2 border ${cellClass}`}
        onClick={() => handleSlotClick(date, time)}
      >
        {time}
      </td>
    );
  };

  const generateTable = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {daysOfWeek.map(day => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(24)].map((_, time) => (
            <tr key={time}>
              <td className="border p-2">{time}</td>
              {daysOfWeek.map((day, index) => renderCell(`2016-05-${15 + index}`, time))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Availability Calendar</h1>

      <div className="flex items-center">
        <input
          type="range"
          min={0}
          max={100}
          value={jobLength}
          className="range w-full mb-4"
          step={25}
          onChange={handleJobLengthChange}
        />

        <div className="w-full flex justify-between text-xs px-2">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>

      {generateTable()}
    </div>
  );
};

export default AvailabilityCalendar;
