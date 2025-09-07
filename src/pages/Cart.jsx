import { Link } from 'react-router-dom'

import CartItem from '../components/CartItem/index.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { clearProducts, selectCartProducts, selectCartTotalPrice } from '../store/slices/cartSlice.js'
import CartEmpty from '../components/CartEmpty/index.jsx'

const Cart = () => {
  const totalPrice = useSelector(selectCartTotalPrice)
  const dispatch = useDispatch()
  const products = useSelector(selectCartProducts)
  const handleClear = () => {
    if(window.confirm("Вы действительно хотите очистить корзину?"))
      dispatch(clearProducts())
  }

  if (products.length === 0) {
    return <CartEmpty/>
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            {/* иконка корзины */}
            Корзина
          </h2>
          <div className="cart__clear" onClick={handleClear}>
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items for-cart">
          {products.map(item => {
            return (
              <CartItem key={item.key} props={item}/>

          )})}
        </div>

        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Всего пицц: <b>{products.reduce((sum, product) => sum + product.pizzaCount, 0)} шт.</b> </span>
            <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart