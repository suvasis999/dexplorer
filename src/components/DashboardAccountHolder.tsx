import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DataTable } from "./ui/data-table";
import {
  TAccountHolders,
  topAccountHolderColumns,
} from "./columns/topAccountHoldersColumn";
import MongoService from "@/services/mongo_service";
import { convertAmount } from "@/lib/utils";

const DashboardAccountHolder = async () => {
  const mongoService = new MongoService();

  const topAccountHolders = await mongoService.topAddresses();

  const data: TAccountHolders[] | undefined = topAccountHolders?.map((i) => ({
    address: i.address,
    balance: convertAmount(i.balance),
  }));

  return (
    <section className="flex-1">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-gray-500">Top Account Holders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data || []}
            columns={topAccountHolderColumns}
            disableSearch
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardAccountHolder;
