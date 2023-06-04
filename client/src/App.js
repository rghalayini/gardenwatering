import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./APIHelper.js"


function App() {

  const [items, setItems] = useState([])
  const [item, setItem] = useState("")

  useEffect(() => {
    const fetchItemsAndSetItems = async () => {
      const items = await APIHelper.getAllItems()
      setItems(items)
    }
    fetchItemsAndSetItems()
  }, [])

  const createItem = async e => {
    e.preventDefault()
    // if (!item) {
    //   alert("please enter something")
    //   return
    // }
    // if (items.some(({ task }) => task === item)) {
    //   alert(`Task: ${item} already exists`)
    //   return
    // }
    const newItem = await APIHelper.createItem(item)
    setItems([...items, newItem])
  }
  const handleKeyPress = async e =>{
    if (e.key === "Enter"){
      const newItem = await APIHelper.createItem(item)
      setItems([...items, newItem])
    }
  }
  const deleteItem = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteItem(id)
      setItems(items.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  const updateItem = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !items.find(item => item._id === id).completed,
    }
    const updatedTodo = await APIHelper.updateItem(id, payload)
    setItems(items.map(item => (item._id === id ? updatedTodo : item)))
  }
  
  return (
    <div className="App">
      <header>
        <h1>Shopping List</h1>
      </header>
      <div className="add-container">
        <input
          placeholder="Insert your item"
          id="item-input"
          type="text"
          value={item}
          onChange={({ target }) => setItem(target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="addItem-button" onClick={createItem}>
          Add
        </button>
      </div>
      <div className="items-container">
        <ul className="items-list">
          {items.map(({ _id, itemName, completed }, i) => (
            <li
              key={i}
              onClick={e => updateItem(e, _id)}
              className={completed ? "completed" : ""}
            >
              {itemName} 
              <button className='btn btn-danger delete-btn' onClick={e => deleteItem(e, _id)}>Delete </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default App