import React,{useContext} from 'react'
import classes from './meal-item.module.scss'
import MealItemForm from '../Meal-item-form-component/MealItemForm'
import CartContext from '../../context/cart-context/Cart-context'


const MealItem = ({name,description,price,id}) => {

    const {addItemToCartHandler} = useContext(CartContext);

    const disPrice = `$${price.toFixed(2)}`

    const addItemToCart = (amount) => {
        const item = {
            id:id,
            name:name,
            amount:amount,
            price:price
        }
        addItemToCartHandler(item);
    }
  return (
    <li className={classes.meal}>
        <div>
            <h3>{name} </h3>
            <div className={classes.description}> {description} </div>
            <div className={classes.price}> {disPrice} </div>
        </div>
        <div>
            <MealItemForm onAddToCart={addItemToCart}/>
        </div>
    </li>
  )
}

export default MealItem