import AssetTypesClient from '@/app/components/AssetTypesClient'
import { getAssetTypes } from '@/app/lib/actions'

export default async function AssetTypesPage() {
  const assetTypes = await getAssetTypes()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Asset Management</h1>
          <p className="text-gray-600">Create asset types and manage your assets</p>
        </div>

        <AssetTypesClient assetTypes={assetTypes} />
      </div>
    </div>
  )
}
