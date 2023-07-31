import { NextResponse } from "next/server";

export function GET(){
  return NextResponse.json({
    message: "Getting one note ..."
  })
}

export function DELETE(){
  return NextResponse.json({
    message: "deleting one note ..."
  })
}

export function UPDATE(){
  return NextResponse.json({
    message: "updating one note ..."
  })
}