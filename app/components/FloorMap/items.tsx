import { FloorItem } from './types'
import { Resource } from '@/app/lib/resources'

interface ItemProps {
  item: FloorItem
  resources?: Resource[]
}

export function Chair({ item }: ItemProps) {
  const { pos, rotation = 0 } = item
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      <rect x="-15" y="-15" width="30" height="30" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="3" />
      <rect x="-15" y="-20" width="30" height="5" fill="#8B4513" stroke="#654321" strokeWidth="2" />
      {item.label && (
        <text x="0" y="40" fontSize="10" fill="#333" textAnchor="middle">
          {item.label}
        </text>
      )}
    </g>
  )
}

export function Desk({ item, resources }: ItemProps) {
  const { pos, rotation = 0 } = item
  
  // Get resource name from ID
  const assignedName = item.assignedTo 
    ? resources?.find(r => r.id === item.assignedTo)?.name 
    : undefined
  
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      <rect x="-50" y="-30" width="100" height="60" fill="#8B7355" stroke="#654321" strokeWidth="2" rx="4" />
      <rect x="-45" y="-25" width="35" height="20" fill="#A0826D" stroke="#654321" strokeWidth="1" />
      {item.label && (
        <text x="0" y="50" fontSize="12" fill="#333" textAnchor="middle" fontWeight="bold">
          {item.label}
        </text>
      )}
      {assignedName && (
        <text x="0" y="65" fontSize="10" fill="#666" textAnchor="middle">
          {assignedName}
        </text>
      )}
    </g>
  )
}

export function Table({ item }: ItemProps) {
  const { pos, rotation = 0 } = item
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      <rect x="-60" y="-40" width="120" height="80" fill="#D2691E" stroke="#8B4513" strokeWidth="2" rx="5" />
      <circle cx="-40" cy="-20" r="3" fill="#8B4513" />
      <circle cx="40" cy="-20" r="3" fill="#8B4513" />
      <circle cx="-40" cy="20" r="3" fill="#8B4513" />
      <circle cx="40" cy="20" r="3" fill="#8B4513" />
      {item.label && (
        <text x="0" y="5" fontSize="12" fill="#FFF" textAnchor="middle" fontWeight="bold">
          {item.label}
        </text>
      )}
    </g>
  )
}

export function Cabinet({ item }: ItemProps) {
  const { pos, rotation = 0 } = item
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      <rect x="-25" y="-35" width="50" height="70" fill="#696969" stroke="#404040" strokeWidth="2" rx="3" />
      <line x1="-25" y1="0" x2="25" y2="0" stroke="#404040" strokeWidth="2" />
      <circle cx="15" cy="-17" r="3" fill="#C0C0C0" />
      <circle cx="15" cy="17" r="3" fill="#C0C0C0" />
      {item.label && (
        <text x="0" y="55" fontSize="10" fill="#333" textAnchor="middle">
          {item.label}
        </text>
      )}
    </g>
  )
}

export function Plant({ item }: ItemProps) {
  const { pos } = item
  return (
    <g transform={`translate(${pos.x}, ${pos.y})`}>
      <rect x="-15" y="10" width="30" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1" />
      <circle cx="0" cy="0" r="20" fill="#228B22" stroke="#006400" strokeWidth="2" />
      <circle cx="-8" cy="-5" r="10" fill="#32CD32" opacity="0.7" />
      <circle cx="8" cy="-5" r="10" fill="#32CD32" opacity="0.7" />
      <circle cx="0" cy="-12" r="8" fill="#90EE90" opacity="0.6" />
    </g>
  )
}

export function Door({ item }: ItemProps) {
  const { pos, rotation = 0 } = item
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      <rect x="-5" y="-40" width="10" height="80" fill="#8B4513" stroke="#654321" strokeWidth="2" />
      <circle cx="8" cy="0" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      <path d="M -5 -30 Q 30 -15 -5 0" fill="none" stroke="#654321" strokeWidth="1" strokeDasharray="3,3" />
      {item.label && (
        <text x="0" y="60" fontSize="10" fill="#333" textAnchor="middle">
          {item.label}
        </text>
      )}
    </g>
  )
}

export function Window({ item }: ItemProps) {
  const { pos, rotation = 0 } = item
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
      <rect x="-40" y="-5" width="80" height="10" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" opacity="0.6" />
      <line x1="-40" y1="0" x2="40" y2="0" stroke="#4682B4" strokeWidth="2" />
      <line x1="0" y1="-5" x2="0" y2="5" stroke="#4682B4" strokeWidth="2" />
      {item.label && (
        <text x="0" y="25" fontSize="10" fill="#333" textAnchor="middle">
          {item.label}
        </text>
      )}
    </g>
  )
}

// Component mapper
export const ItemComponents = {
  chair: Chair,
  desk: Desk,
  table: Table,
  cabinet: Cabinet,
  plant: Plant,
  door: Door,
  window: Window,
}
