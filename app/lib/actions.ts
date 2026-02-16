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

export async function getAllAssets() {
  try {
    const assets = await prisma.asset.findMany({
      include: {
        assetType: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return assets
  } catch (error) {
    console.error('Error fetching all assets:', error)
    return []
  }
}

export async function updateAsset(prevState: any, formData: FormData) {
  const id = formData.get('id') as string
  const label = formData.get('label') as string
  const assignedTo = formData.get('assignedTo') as string

  if (!id) {
    return {
      success: false,
      error: 'Asset ID is required'
    }
  }

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

  try {
    const asset = await prisma.asset.update({
      where: { id },
      data: {
        label: label.trim(),
        assignedTo: assignedTo.trim()
      }
    })

    revalidatePath('/asset-types')
    
    return {
      success: true,
      data: asset
    }
  } catch (error: any) {
    console.error('Error updating asset:', error)
    
    return {
      success: false,
      error: 'Failed to update asset'
    }
  }
}

export async function getFloors() {
  try {
    const floors = await prisma.floor.findMany({
      include: {
        items: true
      },
      orderBy: { createdAt: 'asc' }
    })
    
    // Transform the data to match the Floor interface
    return floors.map(floor => ({
      id: floor.id,
      name: floor.name,
      width: floor.width,
      height: floor.height,
      items: floor.items.map(item => ({
        id: item.id,
        type: item.type,
        pos: { x: item.posX, y: item.posY },
        rotation: item.rotation,
        label: item.label || undefined,
        assignedTo: item.assignedTo || undefined
      }))
    }))
  } catch (error) {
    console.error('Error fetching floors:', error)
    return []
  }
}

export async function createFloor(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const width = formData.get('width') as string
  const height = formData.get('height') as string

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return {
      success: false,
      error: 'Floor name is required'
    }
  }

  const widthNum = parseInt(width)
  const heightNum = parseInt(height)

  if (isNaN(widthNum) || widthNum <= 0) {
    return {
      success: false,
      error: 'Width must be a positive number'
    }
  }

  if (isNaN(heightNum) || heightNum <= 0) {
    return {
      success: false,
      error: 'Height must be a positive number'
    }
  }

  try {
    const floor = await prisma.floor.create({
      data: {
        name: name.trim(),
        width: widthNum,
        height: heightNum
      }
    })

    revalidatePath('/asset-types')
    revalidatePath('/floor-map')
    
    return {
      success: true,
      data: floor
    }
  } catch (error: any) {
    console.error('Error creating floor:', error)
    
    return {
      success: false,
      error: 'Failed to create floor'
    }
  }
}

export async function updateFloor(prevState: any, formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const width = formData.get('width') as string
  const height = formData.get('height') as string

  if (!id) {
    return {
      success: false,
      error: 'Floor ID is required'
    }
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return {
      success: false,
      error: 'Floor name is required'
    }
  }

  const widthNum = parseInt(width)
  const heightNum = parseInt(height)

  if (isNaN(widthNum) || widthNum <= 0) {
    return {
      success: false,
      error: 'Width must be a positive number'
    }
  }

  if (isNaN(heightNum) || heightNum <= 0) {
    return {
      success: false,
      error: 'Height must be a positive number'
    }
  }

  try {
    const floor = await prisma.floor.update({
      where: { id },
      data: {
        name: name.trim(),
        width: widthNum,
        height: heightNum
      }
    })

    revalidatePath('/asset-types')
    revalidatePath('/floor-map')
    
    return {
      success: true,
      data: floor
    }
  } catch (error: any) {
    console.error('Error updating floor:', error)
    
    return {
      success: false,
      error: 'Failed to update floor'
    }
  }
}

export async function addFloorItem(prevState: any, formData: FormData) {
  const floorId = formData.get('floorId') as string
  const assetId = formData.get('assetId') as string
  const posX = formData.get('posX') as string
  const posY = formData.get('posY') as string

  if (!floorId) {
    return {
      success: false,
      error: 'Floor ID is required'
    }
  }

  if (!assetId) {
    return {
      success: false,
      error: 'Asset is required'
    }
  }

  const posXNum = parseFloat(posX) || 0
  const posYNum = parseFloat(posY) || 0

  try {
    // Get the asset details
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
      include: { assetType: true }
    })

    if (!asset) {
      return {
        success: false,
        error: 'Asset not found'
      }
    }

    const floorItem = await prisma.floorItem.create({
      data: {
        floorId,
        type: asset.assetType.name,
        posX: posXNum,
        posY: posYNum,
        rotation: 0,
        label: asset.label,
        assignedTo: asset.assignedTo
      }
    })

    revalidatePath('/asset-types')
    revalidatePath('/floor-map')
    
    return {
      success: true,
      data: floorItem
    }
  } catch (error: any) {
    console.error('Error adding floor item:', error)
    
    return {
      success: false,
      error: 'Failed to add item to floor'
    }
  }
}

export async function updateFloorItem(prevState: any, formData: FormData) {
  const id = formData.get('id') as string
  const label = formData.get('label') as string
  const assignedTo = formData.get('assignedTo') as string

  if (!id) {
    return {
      success: false,
      error: 'Floor item ID is required'
    }
  }

  try {
    const floorItem = await prisma.floorItem.update({
      where: { id },
      data: {
        label: label?.trim() || null,
        assignedTo: assignedTo?.trim() || null
      }
    })

    revalidatePath('/asset-types')
    revalidatePath('/floor-map')
    
    return {
      success: true,
      data: floorItem
    }
  } catch (error: any) {
    console.error('Error updating floor item:', error)
    
    return {
      success: false,
      error: 'Failed to update floor item'
    }
  }
}

export async function deleteFloorItem(floorItemId: string) {
  try {
    await prisma.floorItem.delete({
      where: { id: floorItemId }
    })

    revalidatePath('/asset-types')
    revalidatePath('/floor-map')
    
    return {
      success: true
    }
  } catch (error: any) {
    console.error('Error deleting floor item:', error)
    
    return {
      success: false,
      error: 'Failed to delete floor item'
    }
  }
}