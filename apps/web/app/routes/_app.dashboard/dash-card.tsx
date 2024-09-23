import Icon from '@sscan/shared/components/icon'
import { Card, CardHeader, CardTitle, CardContent } from '@sscan/shared/ui/card'
import { type icons } from 'lucide-react'
import { type PropsWithChildren } from 'react'

type DashCardProps = {
  title: string
  icon?: keyof typeof icons
}

export const DashCard = ({ title, icon, children }: PropsWithChildren<DashCardProps>) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <Icon name={icon} className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
