import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'cooking oil' },
    { id: 2, name: 'Baking flour' },
    { id: 3, name: 'Bar soap' },
  ]);

  const handleDeleteItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Item List</h1>
      </header>
      <div className="app-body">
        <ItemList items={items} handleDeleteItem={handleDeleteItem} />
        <AddItemForm setItems={setItems} items={items} />
      </div>
    </div>
  );
}

function ItemList(props) {
  const { items, handleDeleteItem } = props;

  return (
    <div className="item-list">
      <h2>Items</h2>
      {items.map((item) => (
        <div key={item.id} className="item">
          <span className="item-name">{item.name}</span>
          <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function AddItemForm(props) {
  const [itemName, setItemName] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newId = Math.max(...props.items.map((item) => item.id)) + 1;
    const newItem = { id: newId, name: itemName };
    const newItems = [...props.items, newItem];
    props.setItems(newItems);
    setItemName('');
  };

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <h2>Add Item</h2>
      <label>
        <span>Item Name:</span>
        <input type="text" value={itemName} onChange={handleInputChange} />
      </label>
      <button className="add-button" type="submit">
        Add
      </button>
      <button onClick={handleClick}>Click me!</button>
      <p>Clicked {clickCount} times</p>
    </form>
  );
}

export default App;

