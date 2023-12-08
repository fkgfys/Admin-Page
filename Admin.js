import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the history object
  // const [inputs, setInputs] = useState({})

  // const handleChange= (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   setInputs(values => ({...values, [name]: value}));

  // }
  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1]; // Get the value of the cookie with the specified name
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

  const handleAdmin = () => {
    // Check if the entered credentials are correct (e.g., hard-coded values)
    const csrftoken = getCookie('csrftoken'); // Fetch the CSRF token from the cookie
    const headers = {
      'X-CSRFToken': csrftoken, // Include the CSRF token in the headers
    };

    const uploadData = new FormData();
    uploadData.append('username', username);
    uploadData.append('password', password);
    fetch('http://localhost:8000/api/create_account/', {
      method: 'POST',
      headers: headers, // Include the headers with the CSRF token
      body: uploadData,
      credentials: 'include'
    })
      .then((res) => {
        console.log(res);
      })
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios.post('http://localhost:8888/api/user/save', inputs);
  //   console.log(inputs);
  // }
  // in <form> tag: onSubmit={handleSubmit}

  return (
    <div className="admin">
      <div>

        <div id = "title_admin">Admin</div>

          <label class="custom-field one">
            <input type="text" placeholder=" " name = "username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <span class="placeholder">Username</span>
          </label>

          <br/>

          <label class="custom-field one">
            <input type="text" placeholder="&nbsp;" name = "password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <span class="placeholder">Password</span>
          </label>

          <br/>

          <button id = "button" onClick={handleAdmin}>Create Account</button>
    
  </div>
    </div>
  );
}
export default Admin;