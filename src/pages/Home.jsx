import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../store/slices/filterSlice.js'

import Categories from '../components/Categories/index.jsx'
import Sort from '../components/Sort/index.jsx'
import Skeleton from '../components/Pizza/Skeleton.jsx'
import Pizza from '../components/Pizza/index.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { sortingTypes } from '../config/sortingTypes.js'

const Home = ({ searchValue }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [pizzas, setPizzas] = useState([])
  const categoryId = useSelector((state) => state.filter.categoryId)
  const [categoryName, setCategoryName] = useState('Все')
  const currentPage = useSelector((state) => state.filter.currentPage)
  const sortType = useSelector((state) => state.filter.sort)

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



  useEffect(() => {
    setIsLoading(true)

    const categoryQuery = categoryId > 0 ? `&category=${categoryId}` : ''
    const query =
      `https://6897aa6b250b078c20428172.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=8${categoryQuery}`
    const url = new URL(query)
    url.searchParams.append('sortBy', sortType.sort)
    url.searchParams.append('order', sortType.order)

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPizzas(data)
    //     setIsLoading(false)
    //   })

    axios.get(url)
      .then((res) => {
        setPizzas(res.data)
        setIsLoading(false)
      })
  }, [categoryId, sortType, currentPage])

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
          onClickCategory={(id) => onClickCategory(id)}
          onCategoryChange={(name) => setCategoryName(name)}
        />
        <Sort sortType={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">{categoryName} пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map((_, index) => <Skeleton key={index} />) // 6 скелетонов
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
      <Pagination currentPage={currentPage} setCurrentPage={(page) => dispatch(setCurrentPage(page))} />
    </>
  )
}

export default Home
