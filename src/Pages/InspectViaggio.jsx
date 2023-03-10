import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleDayOfTrip } from "../Components/SingleDayOfTrip";
import { GetSingleDate } from "../functions/GetSingleDate";
import { url } from "../functions/Url";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function InspectViaggio() {
  const nav = useNavigate();
  const [Viaggio, setViaggio] = useState(null);
  const [numberOfDays, setDays] = useState(0);
  const [ArrOfDays, setArr] = useState([]);

  useEffect(() => {
    setViaggio(JSON.parse(localStorage.getItem("Trip")));
    setDays(
      GetSingleDate(
        JSON.parse(localStorage.getItem("Trip"))["DataInizio"],
        JSON.parse(localStorage.getItem("Trip"))["DataFine"]
      )
    );
  }, []);

  useEffect(() => {
    if (numberOfDays != 0) {
      var arr = [numberOfDays];
      for (let i = 0; i < numberOfDays; i++) {
        arr[i] = {
          giorno: i + 1,
          tappe: [],
        };
      }

      axios
        .get(url + "GetAllTappeOfTripp.php?ID=" + Viaggio["ID"])
        .then((response) => {
          var i = 0;
          response.data.forEach((tappa) => {
            arr[tappa["Data"] - 1].tappe[i] = tappa;
            i++;
          });

          setArr(arr);
        });
    }
  }, [numberOfDays]);

  return Viaggio ? (
    <div>
      <div className="headerTrip">
        <h1 style={{ cursor: "pointer" }} onClick={() => nav("/")} ><HomeIcon style={{ fontSize: "50px" }} /></h1>
        <h1>{Viaggio.Nome}</h1>
      </div>
      <div>
        {ArrOfDays.map((SingleDay) => {
          return (
            <SingleDayOfTrip
              key={SingleDay.giorno}
              tappe={SingleDay.tappe}
              day={SingleDay.giorno}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}

export default InspectViaggio;
