import MongoService from "@/services/mongo_service";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
  data?: any;
};

// export async function GET(request: Request) {}

export async function POST(req: Request) {
  const query = await req.json();

  try {
    const mongoService = new MongoService();

    const data = await mongoService.searchAddress(query.address || "");

    return NextResponse.json({
      message: "Something went wrong!",
      data: data![0].balance,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
    });
  }
}
