import React from "react";
import {
  IconServer,
  IconCheck,
  IconX,
  IconClock,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Kpi } from "./types";

// Initial KPIs data
export const initialKpis: Kpi[] = [
  {
    id: "kpi-1",
    title: "Total Deployments",
    value: 6,
    icon: <IconServer size={16} />,
    trend: { direction: "up", value: "+2" }
  },
  {
    id: "kpi-2",
    title: "Successful Deployments",
    value: 3,
    icon: <IconCheck size={16} />,
    trend: { direction: "up", value: "+1" }
  },
  {
    id: "kpi-3",
    title: "Failed Deployments",
    value: 1,
    icon: <IconX size={16} />,
    trend: { direction: "down", value: "-2" }
  },
  {
    id: "kpi-4",
    title: "Average Deploy Time",
    value: "5m 32s",
    icon: <IconClock size={16} />,
    trend: { direction: "stable", value: "0%" }
  },
  {
    id: "kpi-5",
    title: "Uptime",
    value: "99.9%",
    icon: <IconTrendingUp size={16} />,
    trend: { direction: "up", value: "+0.2%" }
  },
];
