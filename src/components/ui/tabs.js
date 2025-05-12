import React, { createContext, useContext } from "react";

// Create a context for the active tab
const TabsContext = createContext();

export function Tabs({ value, onValueChange, children, className }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, value }) {
  const { value: activeValue, onValueChange } = useContext(TabsContext);

  const typeColors = {
    1: "#ff6f61",
    2: "#f06292",
    3: "#ba68c8",
    4: "#9575cd",
    5: "#7986cb",
    6: "#64b5f6",
    7: "#4dd0e1",
    8: "#4db6ac",
    9: "#81c784"
  };

  const typeNum = Number(value);
  const isActive = value === activeValue;
  const backgroundColor = typeColors[typeNum] || "#ccc";

  const style = {
    backgroundColor,
    color: "white",
    fontWeight: "600",
    borderRadius: "0.375rem",
    padding: "0.5rem 0.75rem",
    border: isActive ? "2px solid white" : "1px solid transparent",
    boxShadow: isActive ? "0 0 0 3px rgba(0,0,0,0.2)" : "none",
    transform: isActive ? "scale(1.05)" : "scale(1)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer"
  };

  return (
    <button style={style} onClick={() => onValueChange(value)}>
      {children}
    </button>
  );
}
export function TabsContent({ children, value }) {
  const { value: activeValue } = useContext(TabsContext);
  return value === activeValue ? <div>{children}</div> : null;
}