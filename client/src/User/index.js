import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { Link, useParams } from "react-router-dom";
import { api } from '../constants';
import './User.css';

function User() {
  const [user, setUser] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch(`${api}/orders/${userId}`, { method: 'GET' });
      const result = await response.json();
      setUser(result);
    } catch (err) { console.log(err); }
  }

  const onRemoveOrder = async(id) => {
    try {
      await fetch(`${api}/orders/${id}`, { method: 'DELETE' });
      await getOrders();
    } catch (err) { console.log(err); }
  }

  return (
    <>
      {!user ? (
        <PacmanLoader color={'#36D7B7'} />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer email</th>
                <th scope="col">Product name</th>
                <th scope="col">SKU</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                user.map((order, index) => {
                  const date = new Date(order.date);
                  return(
                    <tr key={order._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{order.clientId}</td>
                      <td>{order.productName}</td>
                      <td>{order.sku}</td>
                      <td>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`}`}</td>
                      <td>
                        <Link to={`/change-order/${order._id}`}>
                          <button type="button" className="btn btn-warning btn-sm">Modify</button>
                        </Link>
                        <button type="button" onClick={() => {onRemoveOrder(order._id)}} className="btn btn-danger btn-sm">Remove</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Link to={`/add-order/${userId}`}><button type="button" className="btn btn-info">Add order</button></Link>
        </div>
      )}
    </>
  );
}

export default User;
