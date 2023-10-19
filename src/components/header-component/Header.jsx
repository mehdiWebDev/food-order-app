import React from "react"

import mealsImage from '../../assets/meals.jpeg'

import classes from './header-styles.module.scss'
import HeaderButton from "../header-button-component/HeaderButton"

const Header = (props)=>{

    return ( 
        <>
         <header className={classes.header}>
            <h1> RactMeals </h1>
            <HeaderButton onClick = {props.onShowCart} />
         </header>
         
         <div className={classes['main-image']}>
            <img src={mealsImage} alt="meals" />
         </div>
        

        </>
    )
}

export default Header