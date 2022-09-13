import React from "react";
import AppContext from "../context";
import axios from 'axios'
import Info from "./info";

function Drawer({onClose, onRemove, items = []}) {

  const {cartItems, setCartItems} = React.useContext(AppContext);

  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://6308abe346372013f583891c.mockapi.io/orders', {
        items: cartItems
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);  
      
      for (let i = 0; i < array.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6308abe346372013f583891c.mockapi.io/Cart') ;   
      }

    } catch (error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false);
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            className="removeBtn cu-p"
            src="/icons/Remove.svg"
            alt="Close"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>

                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/icons/Remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>

                <li>
                  <span>Налог 5</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>

              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/icons/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
            image={isOrderComplete ? "/img/fullBasket.jpg" : "/img/emptyBasket.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
