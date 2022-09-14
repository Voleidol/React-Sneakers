import React from "react";
import {NavLink} from 'react-router-dom';
import { useCart } from "../hooks/useCart";

function Header(props) {

  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <NavLink to={'/'}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/headerLogo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </NavLink>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="/icons/cart.svg" alt="Корзина" />
          <span>{totalPrice}</span>
        </li>
        <li className="mr-20 cu-p">
          <NavLink to={'/favorites'}>
            <img width={18} height={18} src="/icons/favorites.svg" alt="Закладки" />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/orders'}>
            <img width={18} height={18} src="/icons/user.svg" alt="Пользователь" />
          </NavLink>  
        </li>
      </ul>
    </header>
  );
}

export default Header;
