import { useLocale } from 'next-intl'
import LocaleSwitcherSelect from '../LocaleSwitcherSelect'
import { LiaFlagUsaSolid } from 'react-icons/lia'
import { GiBrazilFlag } from 'react-icons/gi'

export default function LocaleSwitcher() {
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: 'English',
          icon: <LiaFlagUsaSolid />
        },
        {
          value: 'pt-br',
          label: 'Portuguese',
          icon: <GiBrazilFlag />
        }
      ]}
    />
  )
}