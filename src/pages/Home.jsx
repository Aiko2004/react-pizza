import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setSortType } from '../store/slices/filterSlice.js'

import Categories from '../components/Categories/index.jsx'
import Sort from '../components/Sort/index.jsx'
import Skeleton from '../components/Pizza/Skeleton.jsx'
import Pizza from '../components/Pizza/index.jsx'
import Pagination from '../components/Pagination/index.jsx'

const Home = ({ searchValue }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [pizzas, setPizzas] = useState([])
  const categoryId = useSelector((state) => state.filter.categoryId)
  const [categoryName, setCategoryName] = useState('Все')
  const [currentPage, setCurrentPage] = useState(1)
  const sortType = useSelector((state) => state.filter.sort)

  useEffect(() => {
    setIsLoading(true)

    const categoryQuery = categoryId > 0 ? `&category=${categoryId}` : ''
    const query =
      `https://6897aa6b250b078c20428172.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=8${categoryQuery}`
    const url = new URL(query)
    url.searchParams.append('sortBy', sortType.sort)
    url.searchParams.append('order', sortType.order)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data)
        setIsLoading(false)
      })
  }, [categoryId, sortType, currentPage])

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onClickSort = (sortType) => {
    dispatch(setSortType(sortType))
  }

  return (
    <>
      <div className="content__top">
        <Categories
          category={categoryId}
          onClickCategory={(id) => onClickCategory(id)}
          onCategoryChange={(name) => setCategoryName(name)}
        />
        <Sort sortType={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">{categoryName} пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) // 6 скелетонов
          : pizzas
              ?.filter((pizza) =>
                pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map(({ id, title, price, imageUrl, sizes, types }) => (
                <Pizza
                  key={id}
                  title={title}
                  price={price}
                  image={imageUrl}
                  sizes={sizes}
                  types={types}
                />
              ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default Home
