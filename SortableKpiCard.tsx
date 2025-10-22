import React from "react";
import { IconArrowRight, IconTrendingUp, IconTrendingDown, IconGripHorizontal } from "@tabler/icons-react";
import { TrendDirection, Kpi } from "./types";

type SortableKpiCardProps = Kpi;

export function SortableKpiCard(props: SortableKpiCardProps) {
  const { id, title, value, icon, trend, color } = props;

  // Function to decide which trend icon to use
  const getTrendIcon = (direction: TrendDirection) => {
    switch (direction) {
      case "up":
        return <IconTrendingUp size={14} className="mr-1" />;
      case "down":
        return <IconTrendingDown size={14} className="mr-1" />;
      case "stable":
        return <IconArrowRight size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  // Determine trend color based on direction
  const getTrendColor = (direction: TrendDirection) => {
    switch (direction) {
      case "up":
        return "text-blue-500 dark:text-blue-400";
      case "down":
        return "text-red-500 dark:text-red-400";
      case "stable":
        return "text-blue-500 dark:text-blue-400";
      default:
        return "text-neutral-500 dark:text-neutral-400";
    }
  };

  // Use passed color or default
  const valueColor = color || "text-neutral-800 dark:text-neutral-100";

  return (
    <div 
      className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs hover:shadow-md transition-all h-full"
      data-kpi-id={id}
      tabIndex={0} 
      role="article"
      aria-label={`${title}: ${value}${trend ? `, trend ${trend.direction} ${trend.value}` : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon && <div className="mr-2 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-lg" aria-hidden="true">{icon}</div>}
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{title}</div>
        </div>
        <div 
          className="opacity-30 hover:opacity-100 transition-opacity cursor-grab" 
          aria-hidden="true" 
          title="Drag handle"
        >
          <IconGripHorizontal size={16} />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className={`text-xl font-bold ${valueColor}`}>
          {value}
        </div>
        {trend && (
          <div 
            className={`flex items-center text-xs ${getTrendColor(trend.direction)}`}
            aria-label={`Trend: ${trend.direction} ${trend.value}`}
          >
            {getTrendIcon(trend.direction)}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}