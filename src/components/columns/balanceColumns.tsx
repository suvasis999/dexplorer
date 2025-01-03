"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TBalance = {
  address: string;
  balance: string;
};

export const balanceColumns: ColumnDef<TBalance>[] = [
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
];
