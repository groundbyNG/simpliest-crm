import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useParams, useHistory } from "react-router-dom";
import { api } from '../constants';
import './User.css';

function UserChange({ method }) {
  const [isLoading, setStatus] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    method === "change" && (async function func() {
      try {
        const response = await fetch(`${api}/users/${userId}`, { method: 'GET' });
        const { email, name } = await response.json();
        setName(name);
        setEmail(email);
        setStatus(false);
      } catch (err) { console.log(err); }
    })()
  }, []);

  const handleName = (event) => setName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);


  const onChangeUser = async (e) => {
    e.preventDefault();

    try {
      let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
        }),
      }
      if (method === "change") {
        options.method = "PUT";
        options.body = JSON.stringify({
          email,
          name,
        });
      }
      
      const response = await fetch(`${api}/users`, options);
      const result = await response.json();
      result && history.replace('/');
    } catch (err) { console.log(err); }
  }
  
  return (
    <>
        {method === "change" && isLoading ? (
          <PacmanLoader color={'#36D7B7'} />
        ) : (
        <form onSubmit={onChangeUser}>
          <h3>{method === "change" ? 'Modify' : 'Create new'} customer</h3> 
          <br/>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input disabled={method === "change"} type="text" className="form-control" required value={email} id="email" placeholder="Enter email" onChange={handleEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" required value={name} id="name" onChange={handleName} placeholder="Enter name" />
          </div>
          <button type="submit" className="btn btn-primary">{method === "change" ? 'Modify' : 'Create'}</button>
        </form>
      )}
    </>
  );
}

export default UserChange;
