import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, incrementProduct, decrementProduct } from '../../store/slices/cartSlice.js'
import { sizeValues } from '../../config/sizeValues.js'
import { FC } from 'react'
import { RootState } from '../../store/store'
import { CartProduct } from '../../@types/types'

interface CartItemProps {
  item: CartProduct
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const { id, key, title, price, pizzaCount, size, type, image } = item

  const dispatch = useDispatch()

  const handleRemoveProduct = (): void => {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      dispatch(removeProduct(key))
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={image} alt={title} />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {sizeValues[size]} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          onClick={() =>
            pizzaCount > 1
              ? dispatch(decrementProduct(key))
              : handleRemoveProduct()
          }
        >
          -
        </button>
        <b>{pizzaCount}</b>
        <button
          className="button button--outline button--circle cart__item-count-plus"
          onClick={() => dispatch(incrementProduct(key))}
        >
          +
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * pizzaCount} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button
          className="button button--outline button--circle"
          onClick={handleRemoveProduct}
        >
          x
        </button>
      </div>
    </div>
  )
}

export default CartItem
