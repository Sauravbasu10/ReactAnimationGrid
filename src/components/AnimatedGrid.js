import React, { useEffect, useState } from "react";

const GRID_COLS = 20;
const GRID_ROWS = 9;
const ACTIVE_CELLS_COUNT = 6;

const AnimatedGrid = () => {
  const [activeCells, setActiveCells] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveSet = new Set();
      while (newActiveSet.size < ACTIVE_CELLS_COUNT) {
        const row = Math.floor(Math.random() * GRID_ROWS);
        const col = Math.floor(Math.random() * GRID_COLS);
        newActiveSet.add(`${row}-${col}`);
      }
      setActiveCells(Array.from(newActiveSet));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Convert activeCells array to a Set for O(1) lookup during render
  const activeCellsSet = new Set(activeCells);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        width: "100vw",
        height: "100vh",
        gap: "1 px",
        backgroundColor: "#E0BBE4",
      }}
    >
      {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, index) => {
        const row = Math.floor(index / GRID_COLS);
        const col = index % GRID_COLS;
        const cellId = `${row}-${col}`;
        const isActive = activeCellsSet.has(cellId);

        return (
          <div
            key={index}
            style={{
              backgroundColor: isActive ? "#9F7AEA" : "#FFFFFF",
              width: "100%",
              height: "100%",
              transition: "background-color 0.7s ease",
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedGrid;
