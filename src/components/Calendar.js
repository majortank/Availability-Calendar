// src/components/Calendar.js
import React from 'react';

const Calendar = ({ renderCell, availabilityData }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateTable = () => {
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
    <div>
      {generateTable()}
    </div>
  );
};

export default Calendar;
