import classes from "./Checkout-styles.module.scss";
import React, { useContext,useState } from "react";
import { useForm } from "react-hook-form";
import cartContext from "../../context/cart-context/Cart-context";

const Checkout = (props) => {

  const cartCtx = useContext(cartContext);

  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);

  const fromDefaultValues = {
    name: "",
    street: "",
    postal: "",
    city: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: fromDefaultValues });

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
     const response = await fetch("https://react-http-ba1fc-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({userData:data,orderedItems:cartCtx.items}), 
      });

      if(response.ok){
        setIsSubmitting(false);
        setDidSubmit(true);
        reset(fromDefaultValues);
        cartCtx.clearCartHandler();
      }
  };

  const formContent = (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
    <div className={`${classes.control} ${errors.name ? classes.invalid : ""}`}>
      <label htmlFor="name">Your Name</label>
      <input
        type="text"
        id="name"
        {...register("name", { required: "this is required" })}
      />
      <p> {errors.name?.message} </p>
    </div>
    <div className={`${classes.control} ${errors.street ? classes.invalid : ""}`}>
      <label htmlFor="street">Street</label>
      <input
        type="text"
        id="street"
        {...register("street", { required: "this is required" })}
      />
        <p> {errors.street?.message} </p>
    </div>
    <div className={`${classes.control} ${errors.postal ? classes.invalid : ""}`}>
      <label htmlFor="postal">Postal Code</label>
      <input
        type="text"
        id="postal"
        {...register("postal", {
          required: "this is required",
          minLength: {
            value: 5,
            message: "min length is 5",
          },
        })}
      />
      <p> {errors.postal?.message} </p>
    </div>
    <div className={`${classes.control} ${errors.city ? classes.invalid : ""}`}>
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        {...register("city", { required: "this is required" })}
      />
        <p> {errors.city?.message} </p>
    </div>
    <div className={classes.actions}>
      <button type="button" onClick={props.onClose}>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div>
  </form>);

  const isSubmittingContent = <p> Sending order data... </p>;
  const didSubmitContent = <p> Successfully sent the order! </p>;


  return (
    <>
    { !didSubmit && !isSubmitting && formContent }
    { isSubmitting && isSubmittingContent }
    { didSubmit && didSubmitContent }
    </>

  );
};

export default Checkout;
