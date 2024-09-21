import { type Record } from '@sscan/db/schema'
import { type ColumnDef } from '@tanstack/react-table'

const formatHeader = (header: string) => {
  return <div className="text-right">{header}</div>
}

export const recColumns: ColumnDef<Record>[] = [
  {
    accessorKey: 'id',
    header: () => formatHeader('ID'),
  },
  {
    accessorKey: 'upc',
    header: () => formatHeader('UPC'),
  },
  {
    accessorKey: 'name',
    header: () => formatHeader('Name'),
  },
  {
    accessorKey: 'artist',
    header: () => formatHeader('Artist'),
  },
  {
    accessorKey: 'createdAt',
    header: () => formatHeader('Created At'),
  },
]
