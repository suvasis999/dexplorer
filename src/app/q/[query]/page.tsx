import { blocksColumns } from "@/components/columns/blocksCoumns";
import { DataTable } from "@/components/ui/data-table";
import MongoService from "@/services/mongo_service";
import { GetServerSideProps } from "next";

async function SearchPage(props: any) {
  const { query } = props.params;

  const mongoService = new MongoService();

  const data = await mongoService.searchAddress(query);

  const tableData: any[] | undefined = data?.map((data) => {
    return {
      ...data,
    };
  });

  const simplifiedData = JSON.parse(JSON.stringify(tableData));

  return (
    <section className="px-12 w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Blocks</h2>

      <DataTable data={simplifiedData || []} columns={blocksColumns} />
    </section>
  );
}

export default SearchPage;
