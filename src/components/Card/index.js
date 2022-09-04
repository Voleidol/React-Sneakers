import React from "react";
import styles from "./Card.module.scss";

function Card({id, onFavorite, imageUrl, title, price, onPlus, favorited = false}) {

  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    setIsAdded(!isAdded)
    onPlus({imageUrl, title, price})
  }

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite({id, imageUrl, title, price})
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? "icons/heart-liked.svg" : "icons/heart-unliked.svg"} alt="Unliked" />
      </div>

      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/icons/btn-checked.svg" : "/icons/btn-plus.svg"} alt="" />
      </div>
    </div>
  );
}

export default Card;
