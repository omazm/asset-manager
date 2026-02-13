import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const assetTypesData = [
  {
    name: 'Chair',
    svgData: JSON.stringify({
      type: 'chair',
      elements: [
        {
          type: 'rect',
          x: -15,
          y: -15,
          width: 30,
          height: 30,
          fill: '#8B4513',
          stroke: '#654321',
          strokeWidth: 2,
          rx: 3
        },
        {
          type: 'rect',
          x: -15,
          y: -20,
          width: 30,
          height: 5,
          fill: '#8B4513',
          stroke: '#654321',
          strokeWidth: 2
        }
      ]
    })
  },
  {
    name: 'Desk',
    svgData: JSON.stringify({
      type: 'desk',
      elements: [
        {
          type: 'rect',
          x: -50,
          y: -30,
          width: 100,
          height: 60,
          fill: '#8B7355',
          stroke: '#654321',
          strokeWidth: 2,
          rx: 4
        },
        {
          type: 'rect',
          x: -45,
          y: -25,
          width: 35,
          height: 20,
          fill: '#A0826D',
          stroke: '#654321',
          strokeWidth: 1
        }
      ]
    })
  },
  {
    name: 'Table',
    svgData: JSON.stringify({
      type: 'table',
      elements: [
        {
          type: 'rect',
          x: -60,
          y: -40,
          width: 120,
          height: 80,
          fill: '#D2691E',
          stroke: '#8B4513',
          strokeWidth: 2,
          rx: 5
        },
        {
          type: 'circle',
          cx: -40,
          cy: -20,
          r: 3,
          fill: '#8B4513'
        },
        {
          type: 'circle',
          cx: 40,
          cy: -20,
          r: 3,
          fill: '#8B4513'
        },
        {
          type: 'circle',
          cx: -40,
          cy: 20,
          r: 3,
          fill: '#8B4513'
        },
        {
          type: 'circle',
          cx: 40,
          cy: 20,
          r: 3,
          fill: '#8B4513'
        }
      ]
    })
  },
  {
    name: 'Cabinet',
    svgData: JSON.stringify({
      type: 'cabinet',
      elements: [
        {
          type: 'rect',
          x: -25,
          y: -35,
          width: 50,
          height: 70,
          fill: '#696969',
          stroke: '#404040',
          strokeWidth: 2,
          rx: 3
        },
        {
          type: 'line',
          x1: -25,
          y1: 0,
          x2: 25,
          y2: 0,
          stroke: '#404040',
          strokeWidth: 2
        },
        {
          type: 'circle',
          cx: 15,
          cy: -17,
          r: 3,
          fill: '#C0C0C0'
        },
        {
          type: 'circle',
          cx: 15,
          cy: 17,
          r: 3,
          fill: '#C0C0C0'
        }
      ]
    })
  },
  {
    name: 'Plant',
    svgData: JSON.stringify({
      type: 'plant',
      elements: [
        {
          type: 'rect',
          x: -15,
          y: 10,
          width: 30,
          height: 20,
          fill: '#8B4513',
          stroke: '#654321',
          strokeWidth: 1
        },
        {
          type: 'circle',
          cx: 0,
          cy: 0,
          r: 20,
          fill: '#228B22',
          stroke: '#006400',
          strokeWidth: 2
        },
        {
          type: 'circle',
          cx: -8,
          cy: -5,
          r: 10,
          fill: '#32CD32',
          opacity: 0.7
        },
        {
          type: 'circle',
          cx: 8,
          cy: -5,
          r: 10,
          fill: '#32CD32',
          opacity: 0.7
        },
        {
          type: 'circle',
          cx: 0,
          cy: -12,
          r: 8,
          fill: '#90EE90',
          opacity: 0.6
        }
      ]
    })
  },
  {
    name: 'Door',
    svgData: JSON.stringify({
      type: 'door',
      elements: [
        {
          type: 'rect',
          x: -5,
          y: -40,
          width: 10,
          height: 80,
          fill: '#8B4513',
          stroke: '#654321',
          strokeWidth: 2
        },
        {
          type: 'circle',
          cx: 8,
          cy: 0,
          r: 3,
          fill: '#FFD700',
          stroke: '#DAA520',
          strokeWidth: 1
        },
        {
          type: 'path',
          d: 'M -5 -30 Q 30 -15 -5 0',
          fill: 'none',
          stroke: '#654321',
          strokeWidth: 1,
          strokeDasharray: '3,3'
        }
      ]
    })
  },
  {
    name: 'Window',
    svgData: JSON.stringify({
      type: 'window',
      elements: [
        {
          type: 'rect',
          x: -40,
          y: -5,
          width: 80,
          height: 10,
          fill: '#87CEEB',
          stroke: '#4682B4',
          strokeWidth: 2,
          opacity: 0.6
        },
        {
          type: 'line',
          x1: -40,
          y1: 0,
          x2: 40,
          y2: 0,
          stroke: '#4682B4',
          strokeWidth: 2
        },
        {
          type: 'line',
          x1: 0,
          y1: -5,
          x2: 0,
          y2: 5,
          stroke: '#4682B4',
          strokeWidth: 2
        }
      ]
    })
  }
]

async function main() {
  console.log('Starting seed...')

  // Delete existing asset types
  await prisma.assetType.deleteMany()
  console.log('Cleared existing asset types')

  // Create asset types
  for (const assetTypeData of assetTypesData) {
    const assetType = await prisma.assetType.create({
      data: assetTypeData
    })
    console.log(`Created asset type: ${assetType.name}`)
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
