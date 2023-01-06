import React from 'react'
import classes from './card-styles.module.scss'
const Card = ({children}) => {
  return (
    <div className={classes.card}>
        {children}
    </div>
  )
}

export default Card