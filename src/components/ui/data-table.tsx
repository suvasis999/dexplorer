"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "./input";
import { CSVLink } from "react-csv"; //new Date(cell.row.original.timestamp).toISOString()
import { Button } from "./button";
import moment from "moment";

function formatNumber(number: any, maxDecimalPlaces = 6) {
  if (isNaN(number)) {
    return number; // Handle NaN values
  }

  const decimalPlaces = Math.min(
    maxDecimalPlaces,
    (number.toString().split(".")[1] || "").length
  );
  return parseFloat(number).toFixed(decimalPlaces);
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disablePagination?: boolean;
  disableSearch?: boolean;
  timestamp?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  disablePagination,
  disableSearch,
}: DataTableProps<TData, TValue>) {
  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query, 300);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: debouncedSearchTerm,
    },
    onGlobalFilterChange: setQuery,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: disablePagination,
  });

  const { rows } = table.getRowModel();

  //The virtualizer needs to know the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  const csvData: any = data;

  const csvD: any = csvData.map((row: { timestamp: any; value: any }) => ({
    ...row,
    timestamp: moment.unix(Number(row.timestamp)).format("MMMM-DD-YYYY HH:mm:ss"),//moment(new Date(row.timestamp)).utc().format("MMMM-DD-YYYY"),
    value: formatNumber(row.value),
  }));

  
  const header: any = columns.map((i) => ({
    label: i.header,
    // @ts-ignore
    key: i.accessorKey,
  }));

  return (
    <div className="rounded-md border">
      <div className="p-2 flex items-center border-b gap-5">
        {!disableSearch && (
          <Input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        )}
        <Button variant={"outline"}>
          <CSVLink data={csvD} headers={header}>
            Download as CSV 
          </CSVLink>
        </Button>
      </div>

      {!disablePagination && <DataTablePagination table={table} />}
      <div ref={tableContainerRef} className="overflow-auto relative ">
        <div style={{/* height: `${rowVirtualizer.getTotalSize()}px` */}}>
          <Table>
            <TableHeader className="bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="relative z-[100] bg-white"
                  style={{
                    transform: `translateY(${
                      tableContainerRef.current?.scrollTop || 0
                    }px)`,
                  }}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<any>;
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
