import AccountBalanceForm from "@/components/AccountBalanceForm";
import { TAccountHolders } from "@/components/columns/topAccountHoldersColumn";
import DashboardAccountHolder from "@/components/DashboardAccountHolder";
import DashboardCards from "@/components/DashboardCards";
import { DashboardChart } from "@/components/DashboardPieChart";
import { ChartConfig } from "@/components/ui/chart";
import { convertAmount } from "@/lib/utils";
import MongoService from "@/services/mongo_service";

export default async function Home() {
  const mongoService = new MongoService();

  const topAccountHolders = await mongoService.topAddresses();

  const data: TAccountHolders[] | undefined = topAccountHolders
    ?.map((i) => ({
      address: i.address,
      balance: i.balance,
    }))
    .slice(0, 10);

  const chartConfig = {
    ...data?.reduce((acc, { address, balance }) => {
      // @ts-ignore
      acc[address] = {
        label: address,
        // color: "white",
      };
      return acc;
    }, {}),
  } satisfies ChartConfig;

  return (
    <>
      <DashboardCards />
      <div className="container flex justify-between items-stretch gap-12 pb-10">
        <div className="w-full flex flex-col gap-6">
          <AccountBalanceForm />
          <DashboardChart chartConfig={chartConfig} chartData={data || []} />
        </div>
        <DashboardAccountHolder />
      </div>
    </>
  );
}
