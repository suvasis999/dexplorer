import { balanceColumns, TBalance } from "@/components/columns/balanceColumns";
import { DataTable } from "@/components/ui/data-table";
import { convertAmount } from "@/lib/utils";
import MongoService from "@/services/mongo_service";

const BalancePage = async () => {
  const mongoService = new MongoService();

  const data = await mongoService.getBalances();

  const tableData: TBalance[] | undefined = data?.map((data) => {
    return {
      address: data.address,
      balance: convertAmount(data.balance),
    };
  });

  return (
    <>
      <section className="px-12 w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Balance</h2>
        <DataTable data={tableData || []} columns={balanceColumns} />
      </section>
    </>
  );
};

export default BalancePage;
