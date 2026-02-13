'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createAssetType(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const svgData = formData.get('svgData') as string

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return {
      success: false,
      error: 'Asset type name is required'
    }
  }

  if (!svgData || typeof svgData !== 'string' || svgData.trim().length === 0) {
    return {
      success: false,
      error: 'SVG data is required'
    }
  }

  // Validate JSON
  try {
    JSON.parse(svgData)
  } catch (e) {
    return {
      success: false,
      error: 'SVG data must be valid JSON'
    }
  }

  try {
    const assetType = await prisma.assetType.create({
      data: {
        name: name.trim(),
        svgData: svgData.trim()
      }
    })

    revalidatePath('/asset-types')
    
    return {
      success: true,
      data: assetType
    }
  } catch (error: any) {
    console.error('Error creating asset type:', error)
    
    if (error.code === 'P2002') {
      return {
        success: false,
        error: 'Asset type with this name already exists'
      }
    }
    
    return {
      success: false,
      error: 'Failed to create asset type'
    }
  }
}

export async function getAssetTypes() {
  try {
    const assetTypes = await prisma.assetType.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return assetTypes
  } catch (error) {
    console.error('Error fetching asset types:', error)
    return []
  }
}

export async function createAsset(prevState: any, formData: FormData) {
  const label = formData.get('label') as string
  const assignedTo = formData.get('assignedTo') as string
  const assetTypeId = formData.get('assetTypeId') as string

  if (!label || typeof label !== 'string' || label.trim().length === 0) {
    return {
      success: false,
      error: 'Asset label is required'
    }
  }

  if (!assignedTo || typeof assignedTo !== 'string' || assignedTo.trim().length === 0) {
    return {
      success: false,
      error: 'Assigned to field is required'
    }
  }

  if (!assetTypeId) {
    return {
      success: false,
      error: 'Asset type is required'
    }
  }

  try {
    const asset = await prisma.asset.create({
      data: {
        label: label.trim(),
        assignedTo: assignedTo.trim(),
        assetTypeId
      }
    })

    revalidatePath('/asset-types')
    
    return {
      success: true,
      data: asset
    }
  } catch (error: any) {
    console.error('Error creating asset:', error)
    
    return {
      success: false,
      error: 'Failed to create asset'
    }
  }
}

export async function getAssetsByType(assetTypeId: string) {
  try {
    const assets = await prisma.asset.findMany({
      where: { assetTypeId },
      orderBy: { createdAt: 'desc' }
    })
    return assets
  } catch (error) {
    console.error('Error fetching assets:', error)
    return []
  }
}