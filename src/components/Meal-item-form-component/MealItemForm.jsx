import React from 'react'
import classes from './meal-item-styles.module.scss'
import Input from '../Input-component/Input'
const MealItemForm = () => {
  return (
    <form className={classes.form}>
        <Input label="Amount" input={{
          id:'amout',
          type:'number',
          min:'1',
          max:'5',
          step:'1',
          defaultValue:'1'
        }} />
        <button>+ Add</button>
    </form>
  )
}

export default MealItemForm