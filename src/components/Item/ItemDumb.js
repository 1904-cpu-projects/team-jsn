import React from 'react';

const Option = ({ number }) => <option value={number}>{number}</option>;

const makeOptions = quantity => {
  if (quantity === 0) return null;

  const options = [];
  let i = 2;

  while (i < 11 && i <= quantity + 1) {
    options.push(<Option key={i} number={i} />);
    i++;
  }

  return options;
};

const Item = ({ item, updateItem, deleteItem }) => {
  return (
    <li className="list-item">
      <div className="container">
        <span>
          {item.beverage.name} by {item.beverage.manufacturer} :{' '}
          {item.beverage.price}
        </span>{' '}
        <button
          className="button is-danger"
          type="button"
          onClick={() => deleteItem(item.id)}
        >
          Delete
        </button>{' '}
        <select
          value={item.quantity}
          onChange={e => updateItem(item.id, parseInt(e.target.value, 10))}
          name="quantity"
        >
          <Option number={1} />
          {makeOptions(item.beverage.quantity)}
        </select>
      </div>
    </li>
  );
};

export default Item;
