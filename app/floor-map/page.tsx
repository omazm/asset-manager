import Link from 'next/link'
import FloorMap from '@/app/components/FloorMap'
import { getFloors } from '@/app/lib/actions'
import { resources } from '@/app/lib/resources'
import { prisma } from '@/app/lib/prisma'

export default async function FloorMapPage() {
  const [floors, assetTypes] = await Promise.all([
    getFloors(),
    prisma.assetType.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Floor Map</h1>
            <p className="text-gray-600">Visualize building floors and asset locations</p>
          </div>
          <Link
            href="/"
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <FloorMap floors={floors} resources={resources} assetTypes={assetTypes} />

        {/* Development Debug View */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <details className="group">
            <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="inline-block w-4 mr-2 transition-transform group-open:rotate-90">▶</span>
              Floor Data (Dev)
            </summary>
            <div className="px-6 py-4 border-t border-gray-200">
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-xs text-gray-800">
                {JSON.stringify(floors, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
