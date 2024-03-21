import type {ClassValue} from 'clsx';
import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function processURL(url:String,regex:RegExp){
// /\/collections\/[a-zA-Z0-9-]+/
const match = url.match(regex);
if (match) 
  return match[0];
return "";
}