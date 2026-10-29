import { isFiniteNumber } from "./auditGuards";

export const roundToInt = (val: number): number => {
  if (!isFiniteNumber(val)) return 0;
  return Math.round(val);
};

export const roundToTwoDecimals = (val: number): number => {
  if (!isFiniteNumber(val)) return 0.0;
  return Math.round((val + Number.EPSILON) * 100) / 100;
};

export const formatBMRCurrency = (val: number): string => {
  return `$${roundToInt(val).toLocaleString("en-US")}`;
};

export const formatBMRMultiplier = (multiplier: number): string => {
  const safeMultiplier = isFiniteNumber(multiplier) ? multiplier : 1.0;
  return `${safeMultiplier.toFixed(2)}x`;
};

export const formatBMRExpectation = (hours: number): string => {
  const safeHours = isFiniteNumber(hours) ? hours : 0;
  return safeHours > 0
    ? `+${roundToInt(safeHours).toLocaleString("en-US")} hrs`
    : "High Active Adoption";
};
