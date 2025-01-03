import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import MongoService from "@/services/mongo_service";
import RPCService from "@/services/rpc_service";

type TStatCards = {
  title: string;
  value: string;
  description: string;
};

const StatCard: React.FC<TStatCards> = ({ description, value, title }) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <p className="font-bold text-gray-500">{title}</p>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
};

const DashboardCards = async () => {
  const mongoService = new MongoService();
  const rpcService = new RPCService();

  await mongoService.connect();

  const latest_block = await mongoService.latestBlock();
  const txPoolBesuStats = await rpcService.txPoolBesuStatistics();
  const chainId = await rpcService.ethChainId();
  const adminPeers = await rpcService.adminPeers();

  return (
    <section className="container">
      <ul className="flex justify-between gap-12">
        <li className="flex-1">
          <StatCard
            description={""}
            value={latest_block?.number}
            title="Latest Block"
          />
        </li>
        <li className="flex-1">
          <StatCard
            description={`Chain Id ${chainId}`}
            value={txPoolBesuStats}
            title="Transaction in Memopool"
          />
        </li>
        <li className="flex-1">
          <StatCard
            description=""
            value={adminPeers.length + 1}
            title="Nodes in Network"
          />
        </li>
      </ul>
    </section>
  );
};

export default DashboardCards;
