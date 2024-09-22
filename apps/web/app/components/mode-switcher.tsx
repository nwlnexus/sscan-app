import Icon from '../../../../packages/shared/src/components/icon'
import { Button } from '../../../../packages/shared/src/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../../../packages/shared/src/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export const ModeSwitcher = () => {
  const [themeIcon, setThemeIcon] = useState<'SunMoon' | 'Sun' | 'Moon'>('SunMoon')
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setThemeIcon(resolvedTheme === 'light' ? 'Sun' : 'Moon')
  }, [resolvedTheme])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
            <Icon
              name={themeIcon}
              size={16}
              className="transition-opacity duration-300 ease-in-out"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background">
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className="flex flex-row items-center gap-2 px-2"
          >
            <Icon name={'Sun'} size={16} />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className="flex flex-row items-center gap-2 px-2"
          >
            <Icon name={'Moon'} size={16} />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className="flex flex-row items-center gap-2 px-2"
          >
            <Icon name={'SunMoon'} size={16} />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
