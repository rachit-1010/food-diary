import './App.css';
import { saveFoodItem, getFoodItemsForDate } from './db.js';
import { useState, useEffect } from 'react';
import FoodItem from './FoodItem.js';
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
    setFoodItemsToday([...foodItemsToday, {food: food, isHealthy: isHealthy, timeStamp: new Date()}])
    // clear the form
    e.target.food.value = '';
    e.target.isHealthy.checked = false;

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
        <h2>Food Diary</h2>
        {/* Buttons to change the date */}
        <div id='dateButtons'>
          <button className='change-date' onClick={handlePreviousDay}> {'<'} </button>
          <span>{`${today.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][today.getMonth()]}`}</span>
          <button id={new Date().getDate()===today.getDate() ? 'disable-button' : ''} className='change-date' onClick={handleNextDay}> {'>'} </button>
        </div>
        
        <div id='foodItems'>
          {foodItemsToday.length === 0 ? (
            <p>No food items for today</p>
          ) : (
            foodItemsToday.map((foodItem, index) => (
              <FoodItem key={index} foodItem={foodItem} />
            ))
          )}
        </div>

        {/* show the below code only if date == today */}
        {today.getDate() === new Date().getDate() &&
        <form onSubmit={handleSubmitFoodItem}>
          <label>
            Had something? 
            <div>Record it for posterity:</div>
            <input type="text" name="food" id="addFood"/>
          </label>
          <br />
          <label>
            <input type="checkbox" name="isHealthy" />
            {' '} Is it Healthy?
          </label>
          <br />
          <input type="submit" value="Add" />
        </form>}
        <div id="footer">
        </div>
      </div>
    </div>
  );
}

export default App;
