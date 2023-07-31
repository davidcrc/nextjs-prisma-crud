import { NextResponse } from "next/server";

export function GET(){
  return NextResponse.json({
    message: "Getting notes..."
  })
}

export function POST(){
  return NextResponse.json({
    message: "creating note ..."
  })
}