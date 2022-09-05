import React from "react";
import {Route, Routes} from 'react-router-dom';
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

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
      axios.get('https://6308abe346372013f583891c.mockapi.io/favorite').then(res => {
        setFavorites(res.data)
      });
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj)
      if (cartItems.find((item) => item.id === obj.id)) {
        setCartItems(prev => prev.filter(item => item.id !== obj.id));
        // axios.delete(`https://6308abe346372013f583891c.mockapi.io/Cart/${obj.id}`);
      } else {
        axios.post('https://6308abe346372013f583891c.mockapi.io/Cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
      // else {
      //   const { data } = await axios.post('https://6308abe346372013f583891c.mockapi.io/Cart', obj);
      //   setCartItems((prev) => [...prev, data]);
      // } 
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6308abe346372013f583891c.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://6308abe346372013f583891c.mockapi.io/favorite/${obj.id}`);
      } else {
        const { data } = await axios.post('https://6308abe346372013f583891c.mockapi.io/favorite', obj);
        console.log(data)
        setFavorites((prev) => [...prev, data]);
      } 
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onChangeSearcInput = (event) => {
    setSearchValue(event.target.value);
  }
  
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearcInput={onChangeSearcInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />


        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
          />
      </Routes>
    </div>
  );
}

export default App;
