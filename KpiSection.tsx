import React from "react";
import { 
  DndContext, 
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  rectIntersection,
  MouseSensor,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { Kpi } from "./types";
import SortableKpiItem from "./SortableKpiItem";

interface KpiSectionProps {
  kpis: Kpi[];
  onKpisChange: (newKpis: Kpi[]) => void;
}

export default function KpiSection({ kpis, onKpisChange }: KpiSectionProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Create sensors for detecting different interaction types with modified options
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Disable scrolling when using mouse
      activationConstraint: {
        distance: 8, // Minimum distance required before activating
      }
    }),
    useSensor(PointerSensor, {
      // Prevent auto-scrolling on touch devices
      activationConstraint: {
        distance: 8,
        tolerance: 5,
        delay: 100,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle the start of a drag operation
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  // Handle the end of a drag operation
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    // Return if no destination or if dropped in the same place
    if (!over) return;
    if (active.id === over.id) return;

    // Find the indices of the source and destination
    const oldIndex = kpis.findIndex(kpi => kpi.id === active.id);
    const newIndex = kpis.findIndex(kpi => kpi.id === over.id);

    // Re-order the kpis array and update state
    const newKpis = arrayMove(kpis, oldIndex, newIndex);
    onKpisChange(newKpis);
  }

  // Handle cancellation of a drag operation
  function handleDragCancel() {
    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      autoScroll={false} // Disable auto-scrolling completely
    >
      <div 
        className="mb-6 relative" 
        role="region" 
        aria-label="Key Performance Indicators"
      >
        <SortableContext 
          items={kpis.map(kpi => kpi.id)} 
          strategy={horizontalListSortingStrategy}
        >
          <div 
            className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin" 
            style={{ touchAction: 'pan-y', overscrollBehavior: 'none' }}
          >
            {kpis.map((kpi) => (
              <SortableKpiItem 
                key={kpi.id} 
                kpi={kpi} 
                isActive={activeId === kpi.id}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}