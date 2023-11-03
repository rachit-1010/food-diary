import * as Realm from 'realm-web';

// const app = new Realm.App({ id: "data-dqkxe" });

// const CLUSTER_NAME = "FoodDiary"
// const DATABASE_NAME = "FoodDiary"
// const COLLECTION_NAME = "FoodDetails"
// const QUOTE_COLLECTION_NAME = "Quotes"

const app = new Realm.App({ id: "data-pjwqb" });

const CLUSTER_NAME = "LifeSync"
const DATABASE_NAME = "FoodDiary"
const COLLECTION_NAME = "FoodDetails"
const QUOTE_COLLECTION_NAME = "Quotes"

const user = await app.logIn(Realm.Credentials.anonymous());

const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
const quotes_collection = mongo.db(DATABASE_NAME).collection(QUOTE_COLLECTION_NAME);

function saveFoodItem(foodItem, isHealthy) {
  const date = new Date()
  const result = collection.updateOne(
    {
      Date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    },
    {
      $push: {
        Items: {
          food: foodItem,
          isHealthy: isHealthy,
          timeStamp: date,
        },
      },
    },
    { upsert: true }
  ).then(() => {
    console.log("Successfully saved food item")
  }).catch((err) => {
    console.error("Failed to save food item", err)
  })
}

async function getFoodItemsForDate (date) {
  const result = await collection.findOne({
    Date: date,
  })
  return result
}

async function getQuotes () {
  const result = await quotes_collection.find({})
  return result
}

export { saveFoodItem, getFoodItemsForDate, getQuotes }