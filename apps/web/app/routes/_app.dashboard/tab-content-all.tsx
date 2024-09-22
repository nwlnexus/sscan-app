import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AllTabContent<T>({ columns, data }: { columns: ColumnDef<T>[]; data: T[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}
