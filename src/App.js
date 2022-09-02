import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
      axios.get('https://6308abe346372013f583891c.mockapi.io/items').then(res => {
        setItems(res.data)
      });
      axios.get('https://6308abe346372013f583891c.mockapi.io/Cart').then(res => {
        setCartItems(res.data)
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://6308abe346372013f583891c.mockapi.io/Cart', obj);
    setCartItems((prev) => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6308abe346372013f583891c.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://6308abe346372013f583891c.mockapi.io/favorite', obj);
    setFavorites((prev) => [...prev, obj]);
  }

  const onChangeSearcInput = (event) => {
    setSearchValue(event.target.value);
  }
  
  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">

        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block">
            <img src="/icons/magnifier.svg" alt="Search" />
            {searchValue && <img className="clear cu-p" onClick={() => setSearchValue('')} src="/icons/Remove.svg" alt="Clear" />}
            <input onChange={onChangeSearcInput} value={searchValue} placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
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
    </div>
  );
}

export default App;
