import { ReactNode } from "react";

export type TrendDirection = "up" | "down" | "stable";

export interface BaseKpi {
  id: string;
  title: string;
  icon: ReactNode;
  trend?: {
    direction: TrendDirection;
    value: string;
  };
  color?: string;
}

export interface NumberKpi extends BaseKpi {
  value: number;
}

export interface StringKpi extends BaseKpi {
  value: string;
}

export type Kpi = NumberKpi | StringKpi;
