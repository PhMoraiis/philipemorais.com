'use client'

import { Locale } from '@/config'
import { setUserLocale } from '@/services/locale'
import clsx from 'clsx'
import { Check, Languages } from 'lucide-react'
import { useTransition } from 'react'
import Magnetic from '../Magnetic'
import { CommandGroup, CommandItem, CommandShortcut } from '../ui/command'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslations } from 'next-intl'

type Props = {
  defaultValue: string
  items: Array<{ value: string, label: string, icon: React.ReactNode }>
}

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
}: Props) {
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  const t = useTranslations('CommandBar')

  return (
    <CommandGroup heading={t('CommandGroup5')}>
      <CommandItem className='flex justify-between'>
        <Select defaultValue={defaultValue} onValueChange={onChange}>
          <SelectTrigger
            className={clsx(
              'rounded-sm p-2 transition-colors hover:bg-slate-200',
              isPending && 'pointer-events-none opacity-60'
            )}
          >
            <SelectValue>
              <Languages className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md"
            position="popper"
          >
            {items.map((item) => (
              <SelectItem
                key={item.value}
                className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                value={item.value}
              >
                <div className="mr-2 w-[1rem]">
                  {item.value === defaultValue && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                </div>
                <div className='flex'>
                  <Magnetic>
                    {item.icon}
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{item.label}</span>
                </div>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>U</CommandShortcut>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CommandItem>
    </CommandGroup>
  )
}