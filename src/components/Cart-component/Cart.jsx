import React,{useContext} from "react";
import classes from "./cart-styles.module.scss";
import Modal from "../UI/Modal-component/Modal";
import cartContext from "../../context/cart-context/Cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {

  const cartCtx = useContext(cartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItemFromCartHandler(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItemToCartHandler({...item,amount:1});
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} {...item} onRemove = {cartItemRemoveHandler.bind(null,item.id)} onAdd = {cartItemAddHandler.bind(null,item)} />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span> Total Amount </span>
        <span> {totalAmount} </span>
      </div>
      <div className={classes.actions}> 
        <button className={classes["button--alt"]} onClick={props.onClose}> Close </button>
       { hasItems && <button className={classes.button}> Order </button>  } 
      </div>
    </Modal>
  );
};

export default Cart;
