import React from "react";
import {Route, Routes} from 'react-router-dom';
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
      async function fetchData() {
        try {
          const [cartResponse, favoritesResponse, itemsResponse] =
            await Promise.all([
              axios.get("https://6308abe346372013f583891c.mockapi.io/Cart"),
              axios.get("https://6308abe346372013f583891c.mockapi.io/favorite"),
              axios.get("https://6308abe346372013f583891c.mockapi.io/items")
            ]);
            
          setIsLoading(false);
          setCartItems(cartResponse.data);
          setFavorites(favoritesResponse.data);
          setItems(itemsResponse.data);
        } catch (error) {
          alert('Ошибка при запросе данных :(');
          console.log(error);
        }
        
      }

      fetchData();
  }, []);

  const onAddToCart = async (obj) => {
      try {
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
          setCartItems(prev => prev.filter(item => item.id !== obj.id));      
          await axios.delete(`https://6308abe346372013f583891c.mockapi.io/Cart/${obj.id}`);
        } else {
          setCartItems((prev) => [...prev, obj]);
          await axios.post('https://6308abe346372013f583891c.mockapi.io/Cart', obj);
        }
      } catch (error) {
        alert('Ошибка при добавлении в корзину');
        console.log(error);
      }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6308abe346372013f583891c.mockapi.io/Cart/${id}`);
      setCartItems((prev) => prev.filter(item => item.id !== id));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.log(error);
    }
    
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6308abe346372013f583891c.mockapi.io/favorite/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://6308abe346372013f583891c.mockapi.io/favorite', obj);
        setFavorites((prev) => [...prev, data]);
      } 
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.log(error);
    }
  }

  const onChangeSearcInput = (event) => {
    setSearchValue(event.target.value);
  }

 const isItemAdded = (id) => {
  console.log(cartItems, 222)
  return cartItems.some((obj) => Number(obj.parentId) === Number(id))
 } 
  
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearcInput={onChangeSearcInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
