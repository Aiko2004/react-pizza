import { useEffect, useCallback, useMemo, useState, JSX } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../store/slices/filterSlice.js'
import { fetchPizzas } from '../store/slices/pizzasSlice.js'

import Categories from '../components/Categories'
import Sort from '../components/Sort/index'
import Skeleton from '../components/Pizza/Skeleton'
import Pizza from '../components/Pizza'
import Pagination from '../components/Pagination/index'
import { sortingTypes } from '../config/sortingTypes'
import { RootState, AppDispatch } from '../store/store'
import { PizzaProps } from '../@types/types'

const Home = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // Redux state (берём точечно, а не весь объект)
  const categoryId = useSelector((state: RootState) => state.filter.categoryId)
  const currentPage = useSelector((state: RootState) => state.filter.currentPage)
  const sortType = useSelector((state: RootState) => state.filter.sort)
  const searchValue = useSelector((state: RootState) => state.filter.searchValue)
  const pizzas = useSelector((state: RootState) => state.pizza.items)
  const status = useSelector((state: RootState) => state.pizza.status)

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
  }, [dispatch])

  // Загружаем пиццы из Redux thunk
  useEffect(() => {
    dispatch(fetchPizzas({ categoryId, sortType, currentPage }))
  }, [categoryId, sortType, currentPage, dispatch])

  // Синхронизация URL
  useEffect(() => {
    const queryString = qs.stringify({
      sortBy: sortType.sort,
      order: sortType.order,
      categoryId,
      currentPage,
    })
    navigate(`?${queryString}`)
  }, [categoryId, sortType, currentPage, navigate])

  // оптимизация коллбэков
  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [dispatch])

  const onClickSort = useCallback((sortType: {name:string, sort: string, order: "asc" | "desc" }) => {
    dispatch(setSortType(sortType))
  }, [dispatch])

  // оптимизация фильтрации
  const filteredPizzas = useMemo(() => {
    return pizzas.filter((pizza) =>
      pizza.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [pizzas, searchValue])

  return (
    <>
      <div className="content__top">
        <Categories
          category={categoryId}
          onClickCategory={onClickCategory}
          onCategoryChange={(name: string) => setCategoryName(name)}
        />
        <Sort sortType={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">{categoryName} пиццы</h2>
      {status === 'error' ? (
        <div className="container content content__error-info">
          <h2>
            Что-то пошло не так <span>😕</span>
          </h2>
          <p>Не удалось получить пиццы, попробуйте повторить позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
            : filteredPizzas.map(({ id, title, price, imageUrl, sizes, types }) => (
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
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={(page) => dispatch(setCurrentPage(page))}
      />
    </>
  )
}

export default Home
