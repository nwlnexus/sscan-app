import { type LucideProps, icons } from 'lucide-react'

type IconProps = {
  name: keyof typeof icons
} & LucideProps

const Icon: React.FC<IconProps> = ({ name, ...props }: { name: string }) => {
  // @ts-expect-error - Error with index signature for icons not found in types
  const LucideIcon = icons[name] as React.ComponentType<LucideProps>

  return <LucideIcon {...props} />
}

export default Icon
