import { FC, useEffect } from 'react'
import classnames from 'classnames'

const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
] as const

type CategoriesProps = {
  category: number
  onClickCategory: (id: number) => void
  onCategoryChange: (name: typeof categories[number]) => void
}

const Categories:FC<CategoriesProps> = ({ category, onClickCategory, onCategoryChange }) => {
  // при первом рендере — достаём сохранённую категорию из sessionStorage
  useEffect(() => {
    const savedIndex = sessionStorage.getItem('categoryIndex')
    if (savedIndex !== null) {
      const index = Number(savedIndex)
      if (!Number.isNaN(index) && categories[index]) {
        onClickCategory(Number(savedIndex)) // диспатчим в Redux
        onCategoryChange(categories[Number(savedIndex)])
      }
    }
  }, [onClickCategory, onCategoryChange])

  // при изменении category — сохраняем в sessionStorage и пробрасываем название
  useEffect(() => {
    sessionStorage.setItem('categoryIndex', category.toString())
    onCategoryChange(categories[category])
  }, [category])

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
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
