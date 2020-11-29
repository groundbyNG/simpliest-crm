import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useParams, useHistory } from "react-router-dom";
import { api } from '../constants';
import './Order.css';

function OrderChange() {
  const [isLoading, setStatus] = useState(true);
  const [productName, setProductName] = useState('');
  const [sku, setSKU] = useState(0);

  const history = useHistory();
  const { orderId } = useParams();

  useEffect(() => {
    (async function func() {
      try {
        const response = await fetch(`${api}/orders/order/${orderId}`, { method: 'GET' });
        const { productName, sku } = await response.json();
        setProductName(productName);
        setSKU(sku);
        setStatus(false);
      } catch (err) { console.log(err); }
    })()
  }, []);

  const handleName = (event) => setProductName(event.target.value);
  const handleSKU = (event) => setSKU(event.target.value);


  const onChangeOrder = async (e) => {
    e.preventDefault();

    try {
      let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          sku,
        }),
      }
      
      const response = await fetch(`${api}/orders/${orderId}`, options);
      const result = await response.json();
      result && history.goBack();
    } catch (err) { console.log(err); }
  }
  
  return (
    <>
        {isLoading ? (
          <PacmanLoader color={'#36D7B7'} />
        ) : (
        <form onSubmit={onChangeOrder}>
          <h3>Modify order</h3> 
          <br/>
          <div className="form-group">
            <label htmlFor="name">Product name</label>
            <input type="text" className="form-control" required value={productName} id="name" onChange={handleName} placeholder="Enter product name" />
          </div>
          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input type="number" className="form-control" required value={sku} id="sku" placeholder="Enter sku" onChange={handleSKU} />
          </div>
          <button type="submit" className="btn btn-primary">Modify</button>
        </form>
      )}
    </>
  );
}

export default OrderChange;
