import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"
import { Prisma } from "@prisma/client";

interface Params { params: {id: string}}

export async function GET(request: Request, {params} : Params ){
  const {id} = params

  try {
    const note = await prisma.note.findUnique({
      where:{
        id: Number(id)
      }
    })

    if(!note){
      return NextResponse.json({message: "Note not found"}, { status: 404})
    }
  
    return NextResponse.json(note)
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(error.message, { status: 500})
    }
  }
}

export async function DELETE(request: Request, {params} : Params ){
  const {id} = params

  try {
    const note = await prisma.note.delete({
      where:{
        id: Number(id)
      }
    })

    if(!note){
      return NextResponse.json({message: "Note not found"}, { status: 404})
    }
  
    return NextResponse.json(note)
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        return NextResponse.json({message: 'Note found'}, { status: 404})
      }

      return NextResponse.json(error.message, { status: 500})
    }
  }
}

export async function PUT(request: Request, {params} : Params ){
  const { title, content } = await request.json()

  const {id} = params

  try {
    const note = await prisma.note.update({
      data:{
        title,
        content
      },
      where:{
        id: Number(id)
      }
    })

    if(!note){
      return NextResponse.json({message: "Note not found"}, { status: 404})
    }
  
    return NextResponse.json(note)
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        return NextResponse.json({message: 'Note found'}, { status: 404})
      }

      return NextResponse.json(error.message, { status: 500})
    }
  }
}