'use client'

import { useState } from 'react'
import { Floor, FloorMapProps } from './types'
import { Resource } from '@/app/lib/resources'
import { DynamicSVGItem } from './DynamicSVGItem'

interface AssetType {
  id: string
  name: string
  svgData: string
  createdAt: Date
  updatedAt: Date
}

interface FloorMapClientProps extends FloorMapProps {
  resources: Resource[]
  assetTypes: AssetType[]
}

export default function FloorMap({ floors, resources, assetTypes }: FloorMapClientProps) {
  const [selectedFloorId, setSelectedFloorId] = useState<string>(
    floors.length > 0 ? floors[0].id : ''
  )

  const selectedFloor = floors.find((floor) => floor.id === selectedFloorId)

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFloorId(e.target.value)
  }

  if (floors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No floors available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Floor Selector Dropdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label htmlFor="floor-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Floor
        </label>
        <select
          id="floor-select"
          value={selectedFloorId}
          onChange={handleFloorChange}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        >
          {floors.map((floor) => (
            <option key={floor.id} value={floor.id}>
              {floor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Floor Map SVG */}
      {selectedFloor && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{selectedFloor.name}</h2>
            <p className="text-sm text-gray-600">
              Dimensions: {selectedFloor.width} x {selectedFloor.height} units
              {' | '}
              Items: {selectedFloor.items.length}
            </p>
          </div>

          <div className="overflow-auto border border-gray-200 rounded-lg bg-gray-50">
            <svg
              width={selectedFloor.width}
              height={selectedFloor.height}
              viewBox={`0 0 ${selectedFloor.width} ${selectedFloor.height}`}
              className="w-full h-auto"
              style={{ minHeight: '400px', maxHeight: '800px' }}
            >
              {/* Floor background */}
              <rect
                x="0"
                y="0"
                width={selectedFloor.width}
                height={selectedFloor.height}
                fill="#F5F5F5"
                stroke="#CCCCCC"
                strokeWidth="2"
              />

              {/* Grid pattern */}
              <defs>
                <pattern
                  id="grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#E0E0E0"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width={selectedFloor.width}
                height={selectedFloor.height}
                fill="url(#grid)"
              />

              {/* Render floor items */}
              {selectedFloor.items.map((item) => {
                const assetType = assetTypes.find(at => at.name.toLowerCase() === item.type.toLowerCase())
                if (!assetType) {
                  console.warn(`No asset type found for: ${item.type}`)
                  return null
                }
                return (
                  <DynamicSVGItem 
                    key={item.id} 
                    item={item} 
                    svgData={assetType.svgData}
                    resources={resources}
                  />
                )
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from(new Set(selectedFloor.items.map(item => item.type))).map((type) => (
                <div key={type} className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-700 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
