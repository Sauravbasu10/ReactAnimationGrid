import React from 'react';

const CourseDashboard = () => {
  return (
    <div className="bg-white rounded-l-2xl rounded-r-none shadow-lg w-full max-w-md h-80 relative overflow-hidden flex items-center justify-center">
      {/* Larger SVG with adjusted positioning */}
      <img
        src="/assets/task2.svg"
        alt="Decorative graphic"
        className="w-[120%] h-[120%] object-contain opacity-100"
      />
    </div>
  );
};

export default CourseDashboard;