import { FloorItem } from './types'
import { Resource } from '@/app/lib/resources'

interface SVGElement {
  type: 'rect' | 'circle' | 'line' | 'path'
  [key: string]: any
}

interface SVGData {
  type: string
  elements: SVGElement[]
}

interface DynamicItemProps {
  item: FloorItem
  svgData: string
  resources?: Resource[]
}

export function DynamicSVGItem({ item, svgData, resources }: DynamicItemProps) {
  const { pos, rotation = 0, label, assignedTo } = item
  
  let parsedSVG: SVGData
  try {
    parsedSVG = JSON.parse(svgData)
  } catch (e) {
    console.error('Invalid SVG data:', e)
    return null
  }

  // Get resource name from ID
  const assignedName = assignedTo 
    ? resources?.find(r => r.id === assignedTo)?.name 
    : undefined

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
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      {parsedSVG.elements.map((element, index) => renderElement(element, index))}
      
      {/* Render label */}
      {label && (
        <text 
          x="0" 
          y={parsedSVG.type === 'desk' ? 50 : 40} 
          fontSize={parsedSVG.type === 'desk' ? 12 : 10}
          fill="#333" 
          textAnchor="middle"
          fontWeight={parsedSVG.type === 'desk' ? 'bold' : 'normal'}
        >
          {label}
        </text>
      )}
      
      {/* Render assigned name for desks */}
      {assignedName && parsedSVG.type === 'desk' && (
        <text x="0" y="65" fontSize="10" fill="#666" textAnchor="middle">
          {assignedName}
        </text>
      )}
    </g>
  )
}
