import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { url } from '../functions/Url';
import { Calendar } from "react-multi-date-picker"
import { useNavigate } from 'react-router-dom';


function CreaViaggio() {
    const [id, setID] = useState(null);
    const [nomeTrip, setNome] = useState("nome..");
    const [Input, setInput] = useState(true);
    const [dataInizio, setInizio] = useState(null)
    const [dataFine, setFine] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        setID(localStorage.getItem("ID").split('|')[0]);
    }, [])



    function CreateTrip() {
        if (id !== null && nomeTrip !== null && nomeTrip !== "nome.." && dataInizio !== null && dataFine !== null) {
            axios.post(url + "CreaViaggio.php?ID=" + id + "&N=" + nomeTrip + "&I=" + dataInizio + "&F=" + dataFine).then(function (response) {
                navigate("/")
            });
        }
    }

    function getDataFromPicker(arr) {
        setInizio(null)
        setFine(null)
        if (arr.length <= 2) {
            var data = arr[0].day
            if (arr[0].month.number >= 10) {
                data += '/' + arr[0].month.number
            } else {
                data += '/0' + arr[0].month.number
            }

            data += '/' + arr[0].year
            setInizio(data);

        }

        if (arr.length === 2) {

            data = arr[1].day
            if (arr[1].month.number >= 10) {
                data += '/' + arr[1].month.number
            } else {
                data += '/0' + arr[1].month.number
            }

            data += '/' + arr[1].year
            setFine(data);
        }
    }

    return (
        <div className='inputContainer'>
            <h4 className='Title'>Crea il Tuo Prossimo Viaggio!</h4>
            <div className='inputPlusBtnContainer'>
                <input className='InputText' value={nomeTrip} onClick={() => {
                    if (Input) {
                        setInput(false);
                        setNome("")
                    }
                }} onChange={(e) => setNome(e.target.value)} type="text" />

                <label>{dataInizio} - {dataFine}</label>

                <Calendar range onChange={(e) => getDataFromPicker(e)} />

                <button className='BtnInput' onClick={() => CreateTrip()}>Crea</button>
            </div>
        </div>
    )
}

export default CreaViaggio