import { transactionsColumns } from "@/components/columns/transactionsColumns";
import { DataTable } from "@/components/ui/data-table";
import MongoService from "@/services/mongo_service";

const TransactionsPage = async () => {
  const mongoService = new MongoService();

  const data = await mongoService.getTransactions(1, 1000);

  const tableData: any[] | undefined = data?.map((data) => {
    return {
      ...data,
    };
  });

  const simplifiedData = tableData && JSON.parse(JSON.stringify(tableData));
         
         
       
   const calcData =simplifiedData.map((row: { value:  any; }) => ({...row, value: (row.value/Math.pow( 10, 18)).toFixed(6)}));
 

  return (
    <>
      <section className="px-12 w-full flex flex-col gap-4 " style={{marginBottom:'30px'}}>
        <h2 className="text-2xl font-bold">Transactions </h2>
        <DataTable data={calcData || []} columns={transactionsColumns} />
      </section>
    </>
  );
};

export default TransactionsPage;
