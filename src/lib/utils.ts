import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateCurrency (num: number) {
  return Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR'}).format(num);
}

export function convertNullToUndefiend<T> (data: T|null|undefined): T|undefined {
  if(data === null){
    return undefined
  }
  return data;
}

