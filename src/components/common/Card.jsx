import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
