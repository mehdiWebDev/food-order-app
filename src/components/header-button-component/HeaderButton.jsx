import CartIcon from "../CartIcon-component/CartIcon";
import classes from "./Header-button-styles.module.scss";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart-context/Cart-context";

const HeaderButton = (props) => {
  const cartCtx = useContext(CartContext);

  const {items} = cartCtx; 

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    
      const timer = setTimeout(() => {
         setBtnIsHighlighted(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      }
      
  }, [items]);

  const numberOfCartItems = cartCtx.items?.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderButton;
