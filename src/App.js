import React from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([{
    "title": "Мужские Кроссовки Nike Blazer Mid Suede",
    "price": 12999,
    "imageUrl": "/img/sneakers/1.jpg"
  },
  {
    "title": "Мужские Кроссовки Nike Air Max 270",
    "price": 15600,
    "imageUrl": "/img/sneakers/2.jpg"
  },]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://6308abe346372013f583891c.mockapi.io/items')
      .then(res => {
        return res.json();
      }).then(json => {
        setItems(json)
      });
  }, []);
  

  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">

        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/icons/magnifier.svg" alt="Search" />
            <input placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={() => console.log('Нажали плюс')}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
