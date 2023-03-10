import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from "../functions/Url"

function Reg() {
  const navigate = useNavigate()

  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Conf, setConf] = useState("");


  function checkInput() {
    if ((Email != "" || Email != " " || Pass != "" || Pass != " ") && Pass === Conf) {

      return true

    }
    return false
  }

  function InviaRichiesta() {
    if (checkInput()) {
      axios.get(url + "CreaUtente.php?P=" + Pass + "&E=" + Email).then(function (response) {
        localStorage.setItem("ID", response.data.ID + "|" + response.data.Email.split('@')[0])
        navigate("/");
      });
    }

  }

  return (
    <div className='inputContainer'>
      <h4 className='Title'>Raccontaci di te</h4>
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
        <div className="SingleInput RegLogInput">
          <label className="Title">Conferma Password:</label>
          <input
            value={Conf}

            onChange={(e) => setConf(e.target.value)}
            className="InputText"
            type="password"
          />
        </div>
        <button className='BtnInput' onClick={() => InviaRichiesta()}>Registrati</button>
        <button className='BtnInput' onClick={() => navigate("/Login")}>Ci conosciamo già</button>
      </div>
    </div>
  )
}

export default Reg