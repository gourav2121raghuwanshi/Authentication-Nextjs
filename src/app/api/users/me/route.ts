import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
  try {
    console.log("in");
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password ");
    console.log("user is " + user)
    return NextResponse.json(user);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      error: err.message,
    });
  }
}
