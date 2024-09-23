import { DataTable } from '@sscan/shared/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@sscan/shared/ui/card'
import { type ColumnDef } from '@tanstack/react-table'

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
