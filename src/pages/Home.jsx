import React from "react";
import Card from "../components/Card";

function Home({items, searchValue, setSearchValue, onChangeSearcInput, onAddToFavorite, onAddToCart}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <img src="/icons/magnifier.svg" alt="Search" />
          {searchValue && (
            <img
              className="clear cu-p"
              onClick={() => setSearchValue("")}
              src="/icons/Remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearcInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
