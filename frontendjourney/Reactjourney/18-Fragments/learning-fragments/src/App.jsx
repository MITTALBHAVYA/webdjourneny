import './App.css'
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import FoodItems from './components/FoodItems';
import ErrorMessage from './components/ErrorMessage';
function App() {
  let foodItems=["Dal","Green Veggi","Roti","Salad","Milk","Ghee"];
  return (
    <>
      <h1>Healthy Foods</h1>
      <ErrorMessage items={foodItems}></ErrorMessage>
      <FoodItems items={foodItems}></FoodItems>
    </>
  );
}

export default App
