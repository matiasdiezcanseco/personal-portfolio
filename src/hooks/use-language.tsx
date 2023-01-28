import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const useLanguage = () => {
  const {
    i18n: { language: lang },
  } = useTranslation()

  const language = useMemo(() => {
    const aux = lang.split('-')[0]
    if (aux !== 'en' && aux !== 'es') return 'en'
    return aux
  }, [lang])

  return { language }
}

export default useLanguage
