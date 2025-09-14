import { useState, useEffect } from 'react'

export function useDebounce(value: string, delay = 500):string {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler) // отменяем таймер при новом вводе
    }
  }, [value, delay])

  return debouncedValue
}
