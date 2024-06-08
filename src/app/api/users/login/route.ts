import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user Exists :
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // check if password is correct :
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    const tokenPayload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
