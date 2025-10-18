import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { icons } from "@workspace/ui/icons/icons";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IconName = keyof typeof icons;

// Helper to list all names in the registry (server-safe)
export function getIconNames(): IconName[] {
  return Object.keys(icons) as IconName[];
}

export function shortNumber(val?: number) {
  const n = Number(val || 0);
  if (!n) return "0";
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "b";
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return String(Math.round(n));
}

export const getTimeDifference = (eventTime: string): string => {
  const currentTime = new Date();
  const eventDateTime = new Date(eventTime);

  const timeDifferenceInMilliseconds =
    eventDateTime.getTime() - currentTime.getTime();
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;

  if (timeDifferenceInMinutes < 60) {
    return `${Math.floor(timeDifferenceInMinutes)} minutes`;
  } else if (timeDifferenceInMinutes < 24 * 60) {
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    const remainingMinutes = Math.floor(timeDifferenceInMinutes % 60);
    return `${hours} hours ${remainingMinutes} minutes`;
  } else {
    const days = Math.floor(timeDifferenceInMinutes / (24 * 60));
    const remainingHours = Math.floor(
      (timeDifferenceInMinutes % (24 * 60)) / 60
    );
    return `${days} days ${remainingHours} hours`;
  }
};
