import { Link } from 'react-router-dom'

import CartItem from '../components/CartItem/index.jsx'
import emptyCartImg from '../assets/img/empty-cart.png';

const cartItems = [
  {
    id: 1,
    title: "Сырный цыпленок",
    type: "тонкое тесто",
    size: 26,
    count: 2,
    price: 770,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg"
  },
  {
    id: 2,
    title: "Пепперони Фреш",
    type: "традиционное тесто",
    size: 30,
    count: 1,
    price: 850,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.jpg"
  }
]

const Cart = () => {
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0)
  const totalCount = cartItems.reduce((sum, obj) => sum + obj.count, 0)

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <h2>Корзина пустая <span>😕</span></h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.<br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            {/* иконка корзины */}
            Корзина
          </h2>
          <div className="cart__clear">
            <span>Очистить корзину</span>
          </div>
        </div>

        <div className="content__items for-cart">
          {cartItems.map(item => (
            <CartItem key={item.id} id={item.id} imageUrl={item.imageUrl} title={item.title} type={item.title} size={item.size} count={item.count} price={item.price}/>
          ))}
        </div>

        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Всего пицц: <b>{totalCount} шт.</b> </span>
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
