import './App.css';
import { saveFoodItem, getFoodItemsForDate, getQuotes } from './db.js';
import { useState, useEffect } from 'react';
import Quotes from './Quotes.js';


function App() {

  const [today, setToday] = useState(new Date());
  const [foodItemsToday, setFoodItemsToday] = useState([]);
  
  // Fetch food items and update the state
  async function fetchFoodItems() {
    const datetoday = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const foodItems = await getFoodItemsForDate(datetoday)
    if (foodItems === null) {
      setFoodItemsToday([])
    }
    else {
      setFoodItemsToday(foodItems.Items)
    }
  }
  useEffect(() => {
    fetchFoodItems();
  }, [today]);

  function handleSubmitFoodItem (e) {
    e.preventDefault();
    const food = e.target.food.value;
    const isHealthy = e.target.isHealthy.checked;
    saveFoodItem(food, isHealthy);
  }

  function handlePreviousDay() {
    const newDate = new Date(today)
    newDate.setDate(today.getDate() - 1)
    setToday(newDate)
  }

  function handleNextDay() {
    const newDate = new Date(today)
    newDate.setDate(today.getDate() + 1)
    if (newDate > new Date()) {
      return
    }
    setToday(newDate)
  }

  return (
    <div className="App">
      <div className="App-header">

        {/* Add the Quotes component */}
        <Quotes />

        {/* Add all the food items from foodItemsToday */}
        <h1>Food Diary</h1>
        {/* Buttons to change the date */}
        <button onClick={handlePreviousDay}>Previous Day</button>
        <br />
        <button onClick={handleNextDay}>Next Day</button>
        <h2>Today is {`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`}</h2>
        <h3>Food Items</h3>
        
        {foodItemsToday.length === 0 ? (
          <p>No food items for today</p>
        ) : (
          foodItemsToday.map((foodItem, index) => (
            <div key={index}>
              <h4>{foodItem.food}</h4>
              <p>{foodItem.isHealthy ? "Healthy" : "Unhealthy"}</p>
            </div>
          ))
        )}

        <form onSubmit={handleSubmitFoodItem}>
          <label>
            Food:
          <br />
            <input type="text" name="food" />
          </label>
          <br />
          <label>
            <input type="checkbox" name="isHealthy" />
            Is it healthy?
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
