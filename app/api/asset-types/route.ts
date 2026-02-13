import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET() {
  try {
    const assetTypes = await prisma.assetType.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(assetTypes)
  } catch (error) {
    console.error('Error fetching asset types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch asset types' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Asset type name is required' },
        { status: 400 }
      )
    }

    const assetType = await prisma.assetType.create({
      data: {
        name: name.trim()
      }
    })

    return NextResponse.json(assetType, { status: 201 })
  } catch (error: any) {
    console.error('Error creating asset type:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Asset type with this name already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create asset type' },
      { status: 500 }
    )
  }
}