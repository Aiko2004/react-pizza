import { useRef, useState, useEffect, memo, useCallback, FC, JSX, SVGProps } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { setSearchValue } from '../../store/slices/filterSlice'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'

type ClearIconProps = SVGProps<SVGSVGElement> & {
  size?: number
  color?: string
  onClickClear: () => void
}


const ClearIcon: React.FC<ClearIconProps> = memo(({size = 24, color = "currentColor", onClickClear, ...props}: ClearIconProps) => (
  <svg
    className={styles.close}
    onClick={onClickClear}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    {...props}
  >
    <title>Очистить</title>
    <g id="cross">
      <line x1="7" x2="25" y1="7" y2="25" />
      <line x1="7" x2="25" y1="25" y2="7" />
    </g>
  </svg>
))

const Search = ():JSX.Element => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500) // ждём 500 мс перед обновлением
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    dispatch(setSearchValue(debouncedValue)) // обновляем глобальный поиск только после паузы
  }, [debouncedValue, dispatch])

  const onClickClear = useCallback(() => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }, [dispatch])

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && <ClearIcon size={20} color="black" onClickClear={onClickClear} />}
    </div>
  )
}

export default Search
