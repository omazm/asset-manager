import AvailableAssetsClient from './AvailableAssetsClient'
import { prisma } from '@/app/lib/prisma'

export default async function AssetsPage() {
  const assetTypes = await prisma.assetType.findMany({
    orderBy: { name: 'asc' }
  })

  return <AvailableAssetsClient assetTypes={assetTypes} />
}
