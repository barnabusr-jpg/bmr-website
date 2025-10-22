import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableKpiCard } from "./SortableKpiCard";
import { Kpi } from "./types";

interface SortableKpiItemProps {
  kpi: Kpi;
  isActive?: boolean;
}

export default function SortableKpiItem({ kpi, isActive = false }: SortableKpiItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: kpi.id });

  // Apply transform and transition CSS
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    width: "calc(20% - 13px)", // Make each card exactly 1/5th of container width, accounting for gap
    flexShrink: 0,  // Prevent cards from shrinking in the flex container
    position: "relative" as const,
    touchAction: "none", // Improve touch handling on mobile
  };

  // Apply additional styling for active state
  const cardClassName = `
    dnd-kpi-item 
    ${isDragging || isActive ? 'scale-105 shadow-lg' : ''}
  `.trim();

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      {...attributes} 
      className={cardClassName}
      data-dragging={isDragging || undefined}
    >
      <div 
        {...listeners} 
        className="h-full cursor-grab active:cursor-grabbing transition-all duration-200"
      >
        <SortableKpiCard {...kpi} />
      </div>
    </div>
  );
}