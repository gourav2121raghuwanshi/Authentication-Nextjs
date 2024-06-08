import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(email);

    console.log(reqBody);
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate a verify token
    const verifyToken = Math.random().toString(36).substr(2, 15);
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user with the verify token
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken, // Assign the generated verify token
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    const tokenPayload = {
      id: savedUser._id,
      email: savedUser.email,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    console.log(savedUser._id);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    const response = NextResponse.json({
      message: "SignUp successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("error at signup"+error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
