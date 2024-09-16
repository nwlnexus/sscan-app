import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const Search = () => {
  return (
    <div>
      <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
    </div>
  )
}
