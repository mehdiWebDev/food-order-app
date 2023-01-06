import React from 'react'
import classes from './input-styles.module.scss'

const Input = ({label,input}) => {
  return (
    <div className={classes.input} >
        <label htmlFor={input.id}>{label}</label>
        <input  {...input}/>
    </div>
  )
}

export default Input