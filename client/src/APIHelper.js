import axios from "axios"

const API_URL = "/garden/"

const createItem = async (name, comments, date, time, createdAt) => {
  try {
    const response = await axios.post(API_URL, {
      name,
      comments,
      date,
      time,
      createdAt
    });
    const newRecord = response.data;
    return newRecord;
  } catch (error) {
    // Handle error if the creation fails
    console.error('Error creating item:', error);
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    const message =response.data;
    return message
  }
  catch (error){
    console.error('Error deleting item:', error);
    throw error;
  }
};

const getAllItems = async() => {
  try {
    const response = await axios.get(API_URL)
    const records = response.data
    return records;
  }catch (error){
    console.error('Error getting all items:', error);
    throw error;
  }
}

const APIHelper = { createItem, deleteItem, getAllItems }
// export default { createItem, deleteItem, updateItem, getAllItems }
export default APIHelper;