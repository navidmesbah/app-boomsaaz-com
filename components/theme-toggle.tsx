'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { IconMoon, IconSun, IconAuto } from '@/components/ui/icons'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          // setTheme(theme === 'light' ? 'dark' : 'light')
          switch (theme) {
            case "light":
              setTheme("dark");
              break;

            case "dark":
              setTheme("system");
              break;

            case "system":
              setTheme("light");
              break;

            default:
              setTheme("system");
              break;
          }
        })
      }}
    >
      {!theme ? null : theme === "system" ? (
        <IconAuto className="transition-all" />
        // <span>ر/ش</span>
      ) : theme === 'dark' ? (
        <IconMoon className="transition-all" />
        // <span>شب</span>
      ) : (
        <IconSun className="transition-all" />
        // <span>روز</span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
