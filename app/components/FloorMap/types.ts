export interface Position {
  x: number
  y: number
}

export interface FloorItem {
  id: string
  type: 'chair' | 'desk' | 'table' | 'cabinet' | 'plant' | 'door' | 'window'
  pos: Position
  rotation?: number
  label?: string
  assignedTo?: string // Resource ID
}

export interface Floor {
  id: string
  name: string
  width: number
  height: number
  items: FloorItem[]
}

export interface FloorMapProps {
  floors: Floor[]
}
