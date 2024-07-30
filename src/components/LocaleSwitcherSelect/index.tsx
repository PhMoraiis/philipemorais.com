'use client'

import { Locale } from '@/config'
import { setUserLocale } from '@/services/locale'
import clsx from 'clsx'
import { Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import Magnetic from '../Magnetic'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger
        className={clsx(
          'flex rounded-sm p-2 transition-colors hover:bg-slate-200',
          isPending && 'pointer-events-none opacity-60'
        )}
      >
        <SelectValue className='flex'>
          <Languages className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
          <span className='text-md hover:animate-text-shake'>{defaultValue}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
          >
            <div className='flex'>
              <Magnetic>
                {item.icon}
              </Magnetic>
              <span className='text-md hover:animate-text-shake'>{item.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}