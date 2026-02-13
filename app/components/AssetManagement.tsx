'use client'

import { useState, useEffect } from 'react'
import AssetForm from './AssetForm'
import { getAssetsByType } from '@/app/lib/actions'

interface AssetType {
  id: string
  name: string
  svgData: string
  createdAt: Date
  updatedAt: Date
}

interface SVGElement {
  type: 'rect' | 'circle' | 'line' | 'path'
  [key: string]: any
}

interface SVGData {
  type: string
  elements: SVGElement[]
}

function SVGPreview({ svgData }: { svgData: string }) {
  let parsed: SVGData
  try {
    parsed = JSON.parse(svgData)
  } catch (e) {
    return <div className="text-red-500 text-xs">Invalid SVG data</div>
  }

  const renderElement = (element: SVGElement, index: number) => {
    const { type, ...props } = element

    switch (type) {
      case 'rect':
        return <rect key={index} {...props} />
      case 'circle':
        return <circle key={index} {...props} />
      case 'line':
        return <line key={index} {...props} />
      case 'path':
        return <path key={index} {...props} />
      default:
        return null
    }
  }

  return (
    <svg
      width="80"
      height="80"
      viewBox="-60 -60 120 120"
      className="bg-gray-50 border border-gray-300 rounded"
    >
      {parsed.elements.map((element, index) => renderElement(element, index))}
    </svg>
  )
}

interface Asset {
  id: string
  label: string
  assignedTo: string
  assetTypeId: string
  createdAt: Date
  updatedAt: Date
}

interface Resource {
  id: string
  name: string
}

interface AssetManagementProps {
  selectedAssetType: AssetType | null
}

export default function AssetManagement({ selectedAssetType }: AssetManagementProps) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoadingAssets, setIsLoadingAssets] = useState(false)

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error fetching resources:', error))
  }, [])

  useEffect(() => {
    if (selectedAssetType) {
      setIsLoadingAssets(true)
      getAssetsByType(selectedAssetType.id).then((data) => {
        setAssets(data)
        setIsLoadingAssets(false)
      })
    } else {
      setAssets([])
    }
  }, [selectedAssetType])

  const getResourceName = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId)
    return resource?.name || resourceId
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {selectedAssetType ? `Assets: ${selectedAssetType.name}` : 'Select an Asset Type'}
        </h3>
        
        {selectedAssetType ? (
          <>
            {/* SVG Preview Section */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <SVGPreview svgData={selectedAssetType.svgData} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Asset Type Preview
                  </h4>
                  <p className="text-xs text-gray-600">
                    This is how <span className="font-medium">{selectedAssetType.name}</span> will appear on the floor map
                  </p>
                </div>
              </div>
            </div>

            <AssetForm 
              assetTypeId={selectedAssetType.id}
              assetTypeName={selectedAssetType.name}
            />
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Existing Assets</h4>
              
              {isLoadingAssets ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : assets.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">
                  No assets created yet for this type.
                </p>
              ) : (
                <div className="space-y-2">
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">{asset.label}</h5>
                          <p className="text-sm text-gray-600">Assigned to: {getResourceName(asset.assignedTo)}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center py-12">
            Click on an asset type to manage its assets
          </p>
        )}
    </div>
  )
}
