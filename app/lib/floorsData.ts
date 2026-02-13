import { Floor } from '@/app/components/FloorMap/types'

export const floorsData: Floor[] = [
  {
    id: 'floor-1',
    name: 'First Floor - Main Office',
    width: 1000,
    height: 600,
    items: [
      // Desks
      {
        id: 'desk-1',
        type: 'Desk',
        pos: { x: 150, y: 150 },
        rotation: 0,
        label: 'Desk 1',
        assignedTo: '1'
      },
      {
        id: 'desk-2',
        type: 'Desk',
        pos: { x: 350, y: 150 },
        rotation: 0,
        label: 'Desk 2',
        assignedTo: '2'
      },
      {
        id: 'desk-3',
        type: 'Desk',
        pos: { x: 550, y: 150 },
        rotation: 0,
        label: 'Desk 3',
        assignedTo: '3'
      },
      {
        id: 'desk-4',
        type: 'Desk',
        pos: { x: 750, y: 150 },
        rotation: 0,
        label: 'Desk 4',
        assignedTo: '4'
      },
      
      // Chairs
      {
        id: 'chair-1',
        type: 'Chair',
        pos: { x: 150, y: 250 },
        rotation: 180,
        label: 'C1'
      },
      {
        id: 'chair-2',
        type: 'Chair',
        pos: { x: 350, y: 250 },
        rotation: 180,
        label: 'C2'
      },
      {
        id: 'chair-3',
        type: 'Chair',
        pos: { x: 550, y: 250 },
        rotation: 180,
        label: 'C3'
      },
      {
        id: 'chair-4',
        type: 'Chair',
        pos: { x: 750, y: 250 },
        rotation: 180,
        label: 'C4'
      },

      // Meeting table
      {
        id: 'table-1',
        type: 'Table',
        pos: { x: 200, y: 450 },
        rotation: 0,
        label: 'Meeting Table'
      },

      // Chairs around table
      {
        id: 'chair-5',
        type: 'Chair',
        pos: { x: 140, y: 420 },
        rotation: 90
      },
      {
        id: 'chair-6',
        type: 'Chair',
        pos: { x: 260, y: 420 },
        rotation: 90
      },
      {
        id: 'chair-7',
        type: 'Chair',
        pos: { x: 140, y: 480 },
        rotation: 270
      },
      {
        id: 'chair-8',
        type: 'Chair',
        pos: { x: 260, y: 480 },
        rotation: 270
      },

      // Cabinets
      {
        id: 'cabinet-1',
        type: 'Cabinet',
        pos: { x: 900, y: 150 },
        rotation: 0,
        label: 'Storage'
      },
      {
        id: 'cabinet-2',
        type: 'Cabinet',
        pos: { x: 900, y: 300 },
        rotation: 0,
        label: 'Files'
      },

      // Plants
      {
        id: 'plant-1',
        type: 'Plant',
        pos: { x: 50, y: 50 }
      },
      {
        id: 'plant-2',
        type: 'Plant',
        pos: { x: 950, y: 50 }
      },
      {
        id: 'plant-3',
        type: 'Plant',
        pos: { x: 500, y: 550 }
      },

      // Doors
      {
        id: 'door-1',
        type: 'Door',
        pos: { x: 50, y: 300 },
        rotation: 0,
        label: 'Main Entrance'
      },
      {
        id: 'door-2',
        type: 'Door',
        pos: { x: 950, y: 500 },
        rotation: 0,
        label: 'Exit'
      },

      // Windows
      {
        id: 'window-1',
        type: 'Window',
        pos: { x: 200, y: 30 },
        rotation: 0
      },
      {
        id: 'window-2',
        type: 'Window',
        pos: { x: 500, y: 30 },
        rotation: 0
      },
      {
        id: 'window-3',
        type: 'Window',
        pos: { x: 800, y: 30 },
        rotation: 0
      }
    ]
  },
  {
    id: 'floor-2',
    name: 'Second Floor - Conference Area',
    width: 1000,
    height: 600,
    items: [
      // Large conference table
      {
        id: 'table-2',
        type: 'Table',
        pos: { x: 500, y: 300 },
        rotation: 0,
        label: 'Conference Table'
      },

      // Chairs around conference table
      {
        id: 'chair-21',
        type: 'Chair',
        pos: { x: 420, y: 240 },
        rotation: 180
      },
      {
        id: 'chair-22',
        type: 'Chair',
        pos: { x: 500, y: 240 },
        rotation: 180
      },
      {
        id: 'chair-23',
        type: 'Chair',
        pos: { x: 580, y: 240 },
        rotation: 180
      },
      {
        id: 'chair-24',
        type: 'Chair',
        pos: { x: 420, y: 360 },
        rotation: 0
      },
      {
        id: 'chair-25',
        type: 'Chair',
        pos: { x: 500, y: 360 },
        rotation: 0
      },
      {
        id: 'chair-26',
        type: 'Chair',
        pos: { x: 580, y: 360 },
        rotation: 0
      },

      // Side tables
      {
        id: 'table-3',
        type: 'Table',
        pos: { x: 150, y: 150 },
        rotation: 0,
        label: 'Break Area'
      },

      // Cabinets
      {
        id: 'cabinet-21',
        type: 'Cabinet',
        pos: { x: 850, y: 150 },
        rotation: 0,
        label: 'Supplies'
      },
      {
        id: 'cabinet-22',
        type: 'Cabinet',
        pos: { x: 850, y: 300 },
        rotation: 0,
        label: 'AV Equipment'
      },

      // Plants
      {
        id: 'plant-21',
        type: 'Plant',
        pos: { x: 100, y: 450 }
      },
      {
        id: 'plant-22',
        type: 'Plant',
        pos: { x: 900, y: 450 }
      },

      // Door
      {
        id: 'door-21',
        type: 'Door',
        pos: { x: 50, y: 300 },
        rotation: 0,
        label: 'Entrance'
      },

      // Windows
      {
        id: 'window-21',
        type: 'Window',
        pos: { x: 300, y: 30 },
        rotation: 0
      },
      {
        id: 'window-22',
        type: 'Window',
        pos: { x: 700, y: 30 },
        rotation: 0
      }
    ]
  },
  {
    id: 'floor-3',
    name: 'Third Floor - Open Workspace',
    width: 1000,
    height: 600,
    items: [
      // Desk clusters
      {
        id: 'desk-31',
        type: 'Desk',
        pos: { x: 200, y: 150 },
        rotation: 0,
        label: 'Desk A1',
        assignedTo: '5'
      },
      {
        id: 'desk-32',
        type: 'Desk',
        pos: { x: 400, y: 150 },
        rotation: 0,
        label: 'Desk A2',
        assignedTo: '6'
      },
      {
        id: 'desk-33',
        type: 'Desk',
        pos: { x: 200, y: 300 },
        rotation: 180,
        label: 'Desk B1',
        assignedTo: '7'
      },
      {
        id: 'desk-34',
        type: 'Desk',
        pos: { x: 400, y: 300 },
        rotation: 180,
        label: 'Desk B2',
        assignedTo: '8'
      },

      // Standing desks
      {
        id: 'desk-35',
        type: 'Desk',
        pos: { x: 700, y: 200 },
        rotation: 0,
        label: 'Standing Desk 1'
      },
      {
        id: 'desk-36',
        type: 'Desk',
        pos: { x: 700, y: 400 },
        rotation: 0,
        label: 'Standing Desk 2'
      },

      // Collaboration table
      {
        id: 'table-31',
        type: 'Table',
        pos: { x: 300, y: 500 },
        rotation: 0,
        label: 'Collab Space'
      },

      // Cabinets
      {
        id: 'cabinet-31',
        type: 'Cabinet',
        pos: { x: 900, y: 100 },
        rotation: 0,
        label: 'Resources'
      },

      // Plants
      {
        id: 'plant-31',
        type: 'Plant',
        pos: { x: 100, y: 100 }
      },
      {
        id: 'plant-32',
        type: 'Plant',
        pos: { x: 600, y: 100 }
      },
      {
        id: 'plant-33',
        type: 'Plant',
        pos: { x: 900, y: 500 }
      },

      // Door
      {
        id: 'door-31',
        type: 'Door',
        pos: { x: 500, y: 570 },
        rotation: 90,
        label: 'Main Entry'
      },

      // Windows
      {
        id: 'window-31',
        type: 'Window',
        pos: { x: 200, y: 30 },
        rotation: 0
      },
      {
        id: 'window-32',
        type: 'Window',
        pos: { x: 500, y: 30 },
        rotation: 0
      },
      {
        id: 'window-33',
        type: 'Window',
        pos: { x: 800, y: 30 },
        rotation: 0
      }
    ]
  }
]
