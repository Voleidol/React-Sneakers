function App() {
  return (
    <div className="wrapper clear">

      <div className="overlay">
        <div className="drawer">
          <h2>Корзина</h2>

          <div className="cartItem d-flex align-center">

            <div style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}} className="cartItemImg">

            </div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>

            <img className="removeBtn" src="/icons/Remove.svg" alt="Remove" />
          </div>

        </div>
      </div>

      <header className="d-flex justify-between align-center p-40">

        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/headerLogo.png" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        
        <ul className="d-flex">
          <li className="mr-30">
            <img width={18} height={18} src="/icons/cart.svg" /> 
            <span>1205 руб.</span> 
          </li>
          <li>
            <img width={18} height={18} src="/icons/user.svg" />
          </li>
        </ul>

      </header>

      <div className="content p-40">

        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/icons/magnifier.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        
        <div className="d-flex">

          <div className="card">
            <div className="favorite">
              <img src="icons/heart-liked.svg" alt="Liked" />
            </div>
            
            <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/icons/plus.svg" alt="" />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/icons/heart-unliked.svg" alt="Unliked" />
            <img width={133} height={112} src="/img/sneakers/2.jpg" alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/icons/plus.svg" alt="" />
              </button>
            </div>
          </div>

          <div className="card">
            <img width={133} height={112} src="/img/sneakers/3.jpg" alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/icons/plus.svg" alt="" />
              </button>
            </div>
          </div>

          <div className="card">
            <img width={133} height={112} src="/img/sneakers/4.jpg" alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/icons/plus.svg" alt="" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
