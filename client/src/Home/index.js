import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import { api } from '../constants';
import './Home.css';

function Home() {
  const [users, setUsers] = useState(false);

  useEffect(() => { getUsers(); }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(`${api}/users`, { method: 'GET' });
      const result = await response.json();
      setUsers(result);
    } catch (err) { console.log(err); }
  }

  const onRemoveUser = async(email) => {
    try {
      await fetch(`${api}/users/${email}`, { method: 'DELETE' });
      await getUsers();
    } catch (err) { console.log(err); }
  }

  return (
    <>
      {!users ? (
        <PacmanLoader color={'#36D7B7'} />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Orders</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return(
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><Link to={`/user/${user.email}`}>{user.orders.length}</Link></td>
                      <td>
                        <Link to={`/add-order/${user.email}`}>
                          <button type="button" className="btn btn-success btn-sm">Add order</button>
                        </Link>
                        <Link to={`/change/${user.email}`}>
                          <button type="button" className="btn btn-warning btn-sm">Modify</button>
                        </Link>
                        <button type="button" onClick={() => {onRemoveUser(user.email)}} className="btn btn-danger btn-sm">Remove</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Link to="/add"><button type="button" className="btn btn-info">Add customer</button></Link>
        </div>
      )}
    </>
  );
}

export default Home;
