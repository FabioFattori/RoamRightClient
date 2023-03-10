import React, { useState, useEffect } from 'react'
import { url } from "../functions/Url";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Login() {




  const navigate = useNavigate()

  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");


  function checkInput() {
    if (Email != "" || Email != " ") {
      if (Pass != "" || Pass != " ") {
        return true
      }
    }
    return false
  }

  function InviaRichiesta() {
    if (checkInput()) {
      axios.get(url + "SearchForUtente.php?P=" + Pass + "&E=" + Email).then(function (response) {
        localStorage.setItem("ID", response.data.ID + "|" + response.data.Email.split('@')[0])
        navigate("/");
      });
    }

  }

  return (
    <div className='inputContainer'>
      <h4 className='Title'>Ci conosciamo già?</h4>
      <div className='inputPlusBtnContainer'>
        <div className="SingleInput RegLogInput">
          <label className="Title">Email:</label>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="InputText"
            type="text"
          />
        </div>
        <div className="SingleInput RegLogInput">
          <label className="Title">Password:</label>
          <input
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
            className="InputText"
            type="password"
          />
        </div>
        <button className='BtnInput' onClick={() => InviaRichiesta()}>Invia</button>
        <button className='BtnInput' onClick={() => navigate("/Reg")}>Non ci conosciamo</button>
      </div>
    </div>
  )
}

export default Login