import CartIcon from "../CartIcon-component/CartIcon"
import classes from './Header-button-styles.module.scss'
const HeaderButton =()=>{

    return <button className={classes.button}>
             <span className={classes.icon}>
                <CartIcon/>
             </span>
             <span>Your Cart</span>
             <span className={classes.badge}>4</span>
           </button>

}
export default HeaderButton