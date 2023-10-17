import React,{useState} from 'react';
import Header from './components/header-component/Header'
import Meals from './components/meals-componets/Meals';
import Cart from './components/Cart-component/Cart';
import { CartProvider } from './context/cart-context/Cart-context';
function App() {

  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }


  return (
    <div className="App">
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} /> } 
        <Header onShowCart={showCartHandler}/>
        <main>
          <Meals />
        </main>
      </CartProvider>
    </div>
  );
}

export default App;
