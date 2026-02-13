'use client'

import { useState, useEffect } from 'react'
import AssetForm from './AssetForm'
import { getAssetsByType } from '@/app/lib/actions'

interface AssetType {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface Asset {
  id: string
  label: string
  assignedTo: string
  assetTypeId: string
  createdAt: Date
  updatedAt: Date
}

interface AssetManagementProps {
  selectedAssetType: AssetType | null
}

export default function AssetManagement({ selectedAssetType }: AssetManagementProps) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoadingAssets, setIsLoadingAssets] = useState(false)

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {selectedAssetType ? `Assets: ${selectedAssetType.name}` : 'Select an Asset Type'}
        </h3>
        
        {selectedAssetType ? (
          <>
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
                          <p className="text-sm text-gray-600">Assigned to: {asset.assignedTo}</p>
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
