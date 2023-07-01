/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateCurrency(num: number){
  return new Intl.NumberFormat('en-IN', {  currency: 'INR', style: 'currency' }).format(num)
}

export function formateDate(date: number|Date|undefined|string){
  return new Intl.DateTimeFormat('en-US').format(date ? new Date(date) : undefined)
}

export function convertNullToUndefined(obj: any): any {
  if (obj === null) {
    return undefined;
  }

  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map((value) => convertNullToUndefined(value));
    }

    const convertedObj: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        convertedObj[key] = convertNullToUndefined(obj[key]);
      }
    }

    return convertedObj;
  }

  return obj;
}
 