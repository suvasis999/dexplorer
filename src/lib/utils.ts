import { BigNumber } from "bignumber.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmount(amount: any, decimals = 18) {
  let amountString = new BigNumber(amount.toString())
    .dividedBy(10 ** decimals)
    .toString();
let amounNewt=parseFloat(amountString).toFixed(6);
  return amounNewt;
}
