import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const status = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  RESET: "RESET",
  IDLE: "IDLE",
  SUCCESS: "SUCCESS",
  DELETE_ROW: "DELETE_ROW",
  UPDATE_ROW: "UPDATE_ROW",
} as const;
