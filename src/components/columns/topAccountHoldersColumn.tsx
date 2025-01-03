"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TAccountHolders = {
  address: string;
  balance: string;
};

export const topAccountHolderColumns: ColumnDef<TAccountHolders>[] = [
  {
    accessorKey: "address",
    header: "Address",
    maxSize: 100,
  },
  {
    accessorKey: "balance",
    header: "Balance",
   

   // accessorKey: "balance",
   // header: "Balance",
    // cell: ({
    //   row: {
    //     original: { balance },
    //   },
    // }) => {
    //   return convertAmount(balance);
    // },
 
  },

];
