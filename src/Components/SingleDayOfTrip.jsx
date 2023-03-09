import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { FindIfTappaIsDone } from "../functions/FindIfTappaIsDone";
import axios from "axios";
import { url } from "../functions/Url";
import {
  CalcolaTotale,
  CalcTotOfTappeToDo,
} from "../functions/CalcTotaleOfDay";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { lightBlue, pink } from "@mui/material/colors";

function SingleDayOfTrip({ day, tappe }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [totale, setTotale] = useState(CalcolaTotale(tappe));
  const [parziale, setParziale] = useState(CalcTotOfTappeToDo(tappe));

  const [nome, setNome] = useState("");
  const [costo, setCosto] = useState(0);

  const navigate = useNavigate();

  function CreaTappa() {
    if (nome !== null && nome !== "") {
      var tappa = {
        ID: 90,
        Svolta: 0,
        Data: day,
        Costo: costo,
        Nome: nome,
      };

      axios
        .post(
          url +
            "CreaTappa.php?N=" +
            tappa.Nome +
            "&C=" +
            tappa.Costo +
            "&D=" +
            tappa.Data +
            "&V=" +
            JSON.parse(localStorage.getItem("Trip"))["ID"]
        )
        .then(() => {
          window.location.reload();
        });
    }
  }

  return (
    <div className="ContainerTappe">
      <h1 className="TitleOfTrip">{day}° giorno</h1>
      <div className="TappeContainer">
        {tappe.map((tappa) => {
          return (
            <div key={tappa["ID"]} className="SingleTappa">
              <FormControlLabel
                onChange={() => {
                  if (tappa["Svolta"] === 1) {
                    tappa["Svolta"] = 0;
                  } else {
                    tappa["Svolta"] = 1;
                  }

                  setTotale(CalcolaTotale(tappe));
                  setParziale(CalcTotOfTappeToDo(tappe));

                  axios.put(
                    url +
                      "ModificaTappa.php?ID=" +
                      tappa["ID"] +
                      "&N=" +
                      tappa["Nome"] +
                      "&S=" +
                      tappa["Svolta"] +
                      "&D=" +
                      tappa["Data"] +
                      "&C=" +
                      tappa["Costo"]
                  );
                }}
                control={
                  FindIfTappaIsDone(tappa["Svolta"]) ? (
                    <Checkbox size="large" defaultChecked />
                  ) : (
                    <Checkbox size="large" />
                  )
                }
                label={tappa["Nome"]}
                labelPlacement="end"
              />
            </div>
          );
        })}
      </div>

      <div className="CalcolaTotale">
        <h1>Totale Della Giornata: {totale} €</h1>
        <h1>Totale Da Spendere: {parziale} €</h1>
      </div>

      <Accordion
        className="Accordion"
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon fontSize="large" sx={{ color: lightBlue[50] }} />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <div className="BtnAddContainer">
              <AddIcon className="AddIcon" />
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="inputContainer CreaTappa">
              <div className="SingleInput">
                <label className="Title">Nome Tappa:</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="InputText"
                  type="text"
                />
              </div>
              <div className="SingleInput">
                <label className="Title">Costo della Tappa:</label>
                <input
                  value={costo}
                  onChange={(e) => setCosto(e.target.value)}
                  className="InputText"
                  type="number"
                />
              </div>

              <button
                className="BtnInput"
                onClick={() => {
                  CreaTappa();
                }}
              >
                Invia
              </button>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export { SingleDayOfTrip };
