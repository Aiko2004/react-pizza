import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../store/slices/filterSlice.js'

import Categories from '../components/Categories/index.jsx'
import Sort from '../components/Sort/index.jsx'
import Skeleton from '../components/Pizza/Skeleton.jsx'
import Pizza from '../components/Pizza/index.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { sortingTypes } from '../config/sortingTypes.js'
import { fetchPizzas } from '../store/slices/pizzasSlice.js'

const Home = ({ searchValue }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Redux state
  const categoryId = useSelector((state) => state.filter.categoryId)
  const currentPage = useSelector((state) => state.filter.currentPage)
  const sortType = useSelector((state) => state.filter.sort)
  const { items: pizzas, status } = useSelector((state) => state.pizza)

  const [categoryName, setCategoryName] = useState('Все')

  // Восстанавливаем фильтры из URL
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sortType = sortingTypes.find(
        (opt) => opt.sort === params.sortBy && opt.order === params.order
      ) || sortingTypes[0]

      dispatch(setFilters({
        categoryId: Number(params.categoryId) || 0,
        sort: sortType,
        currentPage: Number(params.currentPage) || 1,
      }))
    }
  }, [])

  // Загружаем пиццы из Redux thunk
  useEffect(() => {
    dispatch(fetchPizzas({ categoryId, sortType, currentPage }))
  }, [categoryId, sortType, currentPage])

  // Синхронизация URL
  useEffect(() => {
    const queryString = qs.stringify({
      sortBy: sortType.sort,
      order: sortType.order,
      categoryId: categoryId,
      currentPage: currentPage,
    })
    navigate(`?${queryString}`)
  }, [categoryId, sortType, currentPage])

  const onClickCategory = useCallback((id) => {
    dispatch(setCategoryId(id))
  }, [])

  const onClickSort = useCallback((sortType) => {
    dispatch(setSortType(sortType))
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories
          category={categoryId}
          onClickCategory={onClickCategory}
          onCategoryChange={(name) => setCategoryName(name)}
        />
        <Sort sortType={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">{categoryName} пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
          : pizzas
            ?.filter((pizza) =>
              pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map(({ id, title, price, imageUrl, sizes, types }) => (
              <Pizza
                key={id}
                id={id}
                title={title}
                price={price}
                image={imageUrl}
                sizes={sizes}
                types={types}
              />
            ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={(page) => dispatch(setCurrentPage(page))} />
    </>
  )
}

export default Home
