"use client";

// @ts-ignore
import { ColumnDef } from "@tanstack/react-table";
import moment from 'moment';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TTransaction = {
  _id: string;
  blockHash: string;
  blockNumber: number;
  chainId: number;
  from: string;
  gas: number;
  gasPrice: number;
  hash: string;
  input: string;
  nonce: number;
  to: string;
  transactionIndex: number;
  type: number;
  value: number;
  v: number;
  r: string;
  s: string;
  data: string;
  timestamp: string;
};



export const transactionsColumns: ColumnDef<TTransaction>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    /*cell: () => {
      const timestamp = 1721074015 * 1000;

      // Create a new Date object
      const date = new Date(timestamp);

      // Format the date to a readable string
      const formattedDate =date.toLocaleString(); //new Date(timestamp).toUTCString(); //date.toLocaleString();

      return <p>{formattedDate}</p>;
    },*/
    cell: ({ cell }) => {
      return (
        <p>
          {/*moment(new Date(cell.row.original.timestamp)).utc().format("MMMM-DD-YYYY")*/}
          {moment.unix(Number(cell.row.original.timestamp)).format("MMMM-DD-YYYY HH:mm:ss")}
          <br/>
         
        </p>
      );
    },
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ cell }) => {
      return (
        <p>
          { cell.row.original.value}
          { /*(cell.row.original.value/Math.pow( 10, 18)).toFixed(6)*/}
        </p>
      );
    },
   
  },
  {
    accessorKey: "blockNumber",
    header: "Block number",
  },
  {
    accessorKey: "hash",
    header: "Hash",
  },
 
 
  
  
  {
    accessorKey: "blockHash",
    header: "Block Hash",
  },
 
];
