import React from "react";
import classes from "./AvailebeleMeals-styles.module.scss";
import Card from "../Card-component/Card";
import MealItem from "../Meal-item-component/MealItem";

import { useEffect, useState } from "react";



const AvailbleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const fetchMeals = async () => {
    
    const response = await fetch(
      "https://react-http-ba1fc-default-rtdb.firebaseio.com//meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    console.log(responseData);

    const loadedMeals = [];
    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      });
    }

    setMeals(loadedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("AvailbleMeals component is rendered");


      fetchMeals().then().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    
    
  }, []);


  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meale) => (
    <MealItem
      key={meale.id}
      id={meale.id}
      name={meale.name}
      description={meale.description}
      price={meale.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailbleMeals;
