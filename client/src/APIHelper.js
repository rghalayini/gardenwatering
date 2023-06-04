import axios from "axios"

const API_URL = "/items/"

async function createItem(itemName) {
  const { data: newTodo } = await axios.post(API_URL, {
    itemName,
  })
  return newTodo
}

async function deleteItem(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateItem(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
  return newTodo
}

async function getAllItems() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

const APIHelper = { createItem, deleteItem, updateItem, getAllItems }
// export default { createItem, deleteItem, updateItem, getAllItems }
export default APIHelper;