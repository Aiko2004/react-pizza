import { useContext } from 'react'
import { SearchContext } from '../../App.jsx'
import styles from './Search.module.scss'

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)

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
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <svg
          className={styles.close}
          onClick={() => setSearchValue('')}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          stroke="black" // цвет линий
          strokeWidth="2" // толщина
          strokeLinecap="round" // закруглённые концы
        >
          <title>Очистить</title>
          <g id="cross">
            <line x1="7" x2="25" y1="7" y2="25" />
            <line x1="7" x2="25" y1="25" y2="7" />
          </g>
        </svg>
      )}
    </div>
  )
}

export default Search
