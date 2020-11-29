import React, { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useParams, useHistory } from 'react-router-dom';
import { api } from '../constants';
import './Order.css';

function OrderAdd() {
  const [productName, setProductName] = useState('');
  const [sku, setSKU] = useState(0);

  const history = useHistory();
  const { userId } = useParams();

  const handleName = (event) => setProductName(event.target.value);
  const handleSKU = (event) => setSKU(event.target.value);

  const onChangeOrder = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          sku,
        }),
      };

      const response = await fetch(`${api}/orders/${userId}`, options);
      const result = await response.json();
      result && history.replace(`/user/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={onChangeOrder}>
        <h3>Create new order</h3>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            disabled
            type="text"
            className="form-control"
            required
            value={userId}
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            className="form-control"
            required
            value={productName}
            id="name"
            onChange={handleName}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="number"
            className="form-control"
            required
            value={sku}
            id="sku"
            placeholder="Enter sku"
            onChange={handleSKU}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </>
  );
}

export default OrderAdd;
