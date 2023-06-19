import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateCurrency (num: number) {
  return Intl.NumberFormat('in').format(num);
}
