import React from 'react'
import classes from 'cart-styles.module.scss'
const Cart = () => {
    const cartItems =[{id:'c1',name:'Suchi',amount:2,price:12.99}].map(item => <li> {item.name} </li>)
  return (
   
    <div >
        {cartItems}
        <div></div>
        <div></div>
    </div>
  )
}

export default Cart