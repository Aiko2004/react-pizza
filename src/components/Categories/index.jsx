import { useEffect } from 'react'
import classnames from 'classnames'

const categories = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
]

const Categories = ({ category, onClickCategory, onCategoryChange }) => {
  // при первом рендере — достаём сохранённую категорию из sessionStorage
  useEffect(() => {
    const savedIndex = sessionStorage.getItem('categoryIndex')
    if (savedIndex !== null) {
      onClickCategory(Number(savedIndex)) // диспатчим в Redux
      onCategoryChange(categories[Number(savedIndex)])
    }
  }, [])

  // при изменении category — сохраняем в sessionStorage и пробрасываем название
  useEffect(() => {
    sessionStorage.setItem('categoryIndex', category)
    onCategoryChange(categories[category])
  }, [category])

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)} // напрямую диспатчится Redux
            className={classnames({ active: category === index })}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
