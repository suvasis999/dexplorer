"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from 'moment';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TBlocks = {
  _id: string;
  number: number;
  hash: string;
  mixHash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  size: number;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  uncles: [];
};

export const blocksColumns: ColumnDef<TBlocks>[] = [
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ cell }) => {
      return (
        <p>
         {/*moment(new Date(cell.row.original.timestamp)).utc().format("MMMM-DD-YYYY")*/}
         {moment.unix(Number(cell.row.original.timestamp)).format("MMMM-DD-YYYY HH:mm:ss")}
        </p>
      );
    },
  },
  {
    accessorKey: "hash",
    header: "Hash",
  },
  {
    accessorKey: "parentHash",
    header: "Miner",
  },
];
