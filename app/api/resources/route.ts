import { NextResponse } from 'next/server'
import { resources } from '@/app/lib/resources'

export async function GET() {
  return NextResponse.json(resources)
}
