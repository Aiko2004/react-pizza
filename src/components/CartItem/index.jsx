
const CartItem = ({ id, imageUrl, title, type, size, count, price }) => {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, {size} см.</p>
      </div>
      <div className="cart__item-count">
        <button className="button button--outline button--circle cart__item-count-minus">-</button>
        <b>{count}</b>
        <button className="button button--outline button--circle cart__item-count-plus">+</button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button className="button button--outline button--circle">x</button>
      </div>
    </div>
  )
}

export default CartItem