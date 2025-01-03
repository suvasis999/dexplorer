import MongoService from "@/services/mongo_service";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
  data?: any;
};

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") + " ");
  const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") + " ");

  try {
    const mongoService = new MongoService();

    const data = await mongoService.getBlocks(page, pageSize);

    return NextResponse.json({
      message: "Blocks are ready",
      ...data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      error,
    });
  }
}
