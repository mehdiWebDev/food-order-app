import React from 'react'
import classes from './meal-item.module.scss'
import MealItemForm from '../Meal-item-form-component/MealItemForm'

const MealItem = ({name,description,price}) => {
    const disPrice = `$${price.toFixed(2)}`
  return (
    <li className={classes.meal}>
        <div>
            <h3>{name} </h3>
            <div className={classes.description}> {description} </div>
            <div className={classes.price}> {disPrice} </div>
        </div>
        <div>
            <MealItemForm />
        </div>
    </li>
  )
}

export default MealItem