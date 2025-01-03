import { MongoClient } from "mongodb";

export default class MongoService {
  mongo_uri: string | undefined = process.env.MONGODB_URI;
  db_name: string = "dralaIo";
  mongo_client: MongoClient;

  constructor() {
    this.mongo_client = new MongoClient(this.mongo_uri!);
  }

  async connect() {
    try {
      await this.mongo_client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
    }
  }

  async latestBlock() {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("blocks");

    try {
      const block = await collection.findOne(
        {},
        {
          sort: { timestamp: -1 },
        }
      );

      return block;
    } catch (error) {
      console.error("Latest Block Error:", error);
    }

    return null;
  }

  async searchAddress(address: string) {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("balances");

    try {
      const balance = await collection
        .find({
          address: {
            $regex: new RegExp(address, "i"),
          },
        })
        .sort({ timestamp: -1 })
        .toArray();

      return balance;
    } catch (error) {
      console.error("Search Address Error:", error);
    }

    return null;
  }

  async topAddresses(limit: number = 50) {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("balances");

    try {
      const top = await collection
        .find()
        .sort({ balance: -1 })
        .limit(limit)
        .toArray();

      return top;
    } catch (error) {
      console.error("Top Addresses Error:", error);
    }

    return null;
  }

  async getBalances(page: number = 1, size: number = 300) {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("balances");

    try {
      const balances = await collection
        .find()
        .sort({ balance: -1 })
        .skip((page - 1) * size)
        .limit(size)
        .toArray();

      return balances;
    } catch (error) {
      console.error("Get Balances Error:", error);
    }

    return null;
  }

  async getBlocks(page: number = 1, size: number = 100) {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("blocks");

    try {
      const totalRecords = await collection.countDocuments();

      const blocks = await collection
        .find()
        .sort({ number: -1 })
        .skip((page - 1) * size)
        .limit(size)
        .toArray();

      return {
        data: blocks,
        metadata: {
          totalRecords: totalRecords,
          currentPage: page,
          pageSize: size,
          totalPages: Math.ceil(totalRecords / size),
        },
      };
    } catch (error) {
      console.error("Get Blocks Error:", error);
    }

    return null;
  }

  async getTransactions(page: number = 1, size: number = 10) {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("transactions");
    // It will extract the block number from the transaction and then it will fetch the block details from the blocks collection.
    // Then it will use the timestamp of the block to sort the transactions.
    const aggregate = [
      {
        $lookup: {
          from: "blocks",
          localField: "blockNumber",
          foreignField: "number",
          as: "block",
        },
      },
      {
        $unwind: "$block",
      },
      {
        $sort: { "block.timestamp": -1 },
      },
      {
        $skip: (page - 1) * size,
      },
      {
        $limit: size,
      },
      {
        $project: {
          _id: 0,
          blockHash: 1,
          blockNumber: 1,
          chainId: 1,
          from: 1,
          gas: 1,
          hash: 1,
          nonce: 1,
          to: 1,
          value: 1,
          timestamp: "$block.timestamp",
        },
      },
    ];

    try {
      const transactions = await collection.aggregate(aggregate).toArray();

      return transactions;
    } catch (error) {
      console.error("Get Transactions Error:", error);
    }

    return null;
  }

  async totalSupply() {
    const db = this.mongo_client.db(this.db_name);
    const collection = db.collection("balances");

    try {
      const supply = await collection
        .aggregate([
          {
            $group: {
              _id: null,
              totalBalance: { $sum: "$balance" },
            },
          },
          {
            $project: {
              _id: 0,
              totalBalance: 1,
            },
          },
        ])
        .toArray();

      return supply[0].totalBalance;
    } catch (error) {
      console.error("Total Supply Error:", error);
    }

    return null;
  }

  async close() {
    try {
      await this.mongo_client.close();
      console.log("Closed MongoDB Connection");
    } catch (error) {
      console.error("MongoDB Close Error:", error);
    }
  }
}
