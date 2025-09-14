import { useState, useMemo, FC } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import { generalTypes } from '../../config/generalTypes'
import { addProduct } from '../../store/slices/cartSlice'
import { RootState } from '../../store/store'
import { CartProduct } from '../../@types/types'

interface PizzaProps {
  id: number
  title: string
  image: string
  price: number
  sizes: number[]
  types: (0 | 1)[]  | (0)[] // можно уточнить как (0 | 1)[]
}

const Pizza: FC<PizzaProps> = ({ id, title, image, price, sizes, types }) => {
  const dispatch = useDispatch()

  // нормализация размеров
  const normalizedSizes = sizes.length === 3 ? sizes : [26, 0, 40]

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedType, setSelectedType] = useState(0)

  const products = useSelector((state: RootState) => state.cart.products)
  const cartProducts = products.filter((product: CartProduct) => product.id === id)

  const calculatedPrice = useMemo(() => {
    let newPrice = price
    if (normalizedSizes[selectedSize] === 30) {
      newPrice *= 1.15
    }
    if (normalizedSizes[selectedSize] === 40) {
      newPrice *= 1.65
    }
    return Math.round(newPrice / 10) * 10
  }, [price, selectedSize, normalizedSizes])

  const pizzaCount = cartProducts.reduce(
    (sum: number, p: CartProduct): number => sum + p.pizzaCount,
    0
  )

  const onClickAdd = () => {
    const product: CartProduct = {
      id,
      key: `${id}_${normalizedSizes[selectedSize]}_${selectedType}`,
      title,
      price: calculatedPrice,
      image,
      type: generalTypes[selectedType],
      size: normalizedSizes[selectedSize],
      pizzaCount: 1,
    }
    dispatch(addProduct(product))
  }

  const sortedTypes = useMemo(
    () => (types || []).map((i) => generalTypes[i]),
    [types]
  )

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={image} alt={title} />
      <h4 className="pizza-block__title">{title}</h4>

      <div className="pizza-block__selector">
        <ul>
          {sortedTypes.map((type, i) => (
            <li
              key={i}
              className={classNames({ active: selectedType === i })}
              onClick={() => setSelectedType(i)}
            >
              {type}
            </li>
          ))}
        </ul>

        <ul>
          {normalizedSizes.map(
            (size, i) =>
              size !== 0 && (
                <li
                  key={i}
                  className={classNames({ active: selectedSize === i })}
                  onClick={() => setSelectedSize(i)}
                >
                  {size} см.
                </li>
              )
          )}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {calculatedPrice} ₽</div>
        <button
          type="button"
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {pizzaCount > 0 && <i>{pizzaCount}</i>}
        </button>
      </div>
    </div>
  )
}

export default Pizza
