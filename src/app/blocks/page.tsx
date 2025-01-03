"use client";
import { blocksColumns } from "@/components/columns/blocksCoumns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import MongoService from "@/services/mongo_service";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const BlocksPage = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1); 
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [totalRecords, setTotalRecords] = useState(1);
  const [value, setValue] = useState('');
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["fetchBlocks"],
    queryFn: async () => {
      const data = await axios.get("/api/fetchBlocks", {
        params: {
          page: currentPageNumber,
          pageSize: currentPageSize,
        },
      });

      setTotalRecords(data.data.metadata.totalRecords);

      return data.data.data;
    },
  });

  const handleForwardPagination = () => {
    setCurrentPageNumber((prev) => prev + 1);
    console.log('forwaard',currentPageNumber);
  };
  const handleBackwardPagination = () => {
    setCurrentPageNumber((prev) => prev - 1);
    console.log('back',currentPageNumber);
  };
  const goToPage = () => {
    const totalRecord=totalRecords / currentPageSize;
    if(parseInt(value)>totalRecord){
      alert('Please check the page no')
    }
    else{
      setCurrentPageNumber(parseInt(value));
      
    }
    
  };

  

  useEffect(() => {
    refetch();
   
  }, [currentPageNumber, currentPageSize]);

 
  if (isLoading) {
    return (
      <div className="container flex flex-col gap-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  {/*if (isFetching) {
    return (
      <div className="container flex flex-col gap-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }*/}

  return (
    <>
      <section className="px-12 w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Blocks</h2>

        {data && (
          <>
            <div className="w-full flex items-center justify-between gap-6">
              <div className="flex-1 text-sm text-muted-foreground">
                {totalRecords} row(s)
              </div>
             
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={currentPageSize.toString()}
                  onValueChange={(value) => {
                    setCurrentPageSize(parseInt(value));
                    
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={currentPageSize} />
                  </SelectTrigger>
                  <SelectContent className="z-[200]" side="top">
                    {[10, 20, 30, 40, 50,100,200,500,1000].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium"> Page No.</p>
                <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
             
                <Button
                  onClick={() => {
                    goToPage()
                  }}
                  variant={"outline"}
                  type="button"
                >
                  Go
                </Button>
              </div>

              <div className="flex  items-center justify-center text-sm font-medium">
                Page {currentPageNumber} of{" "}
                {Math.ceil(totalRecords / currentPageSize)}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPageNumber === 1 || isFetching}
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={handleBackwardPagination}
                >
                  <ChevronLeftIcon />
                </Button>

                
                {currentPageNumber}

                <Button
                  variant="outline"
                  onClick={handleForwardPagination}
                  disabled={isFetching}
                  className="hidden h-8 w-8 p-0 lg:flex"
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>

            <DataTable
              data={data || []}
              columns={blocksColumns}
              disablePagination
            />
          </>
        )}
      </section>
    </>
  );
};

export default BlocksPage;
