
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateCurrency(num: number){
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3, currency: 'INR' }).format(num)
}

export function formateDate(date: number|Date|undefined){
  return new Intl.DateTimeFormat('en-US').format(date)
}

export function convertNullToUndefiend<T>(data: T|null|undefined): T|undefined{
  if(data === null){
    return undefined
  }

  return data
} 