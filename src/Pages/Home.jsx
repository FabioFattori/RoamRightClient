import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Button, Popover, ButtonGroup, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Build";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { url } from "../functions/Url";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

function Home() {
  const [name, setName] = useState("User");
  const navigate = useNavigate();

  //{
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //}

  useEffect(() => {
    if (
      localStorage.getItem("ID") == undefined ||
      localStorage.getItem("ID") == null
    )
      navigate("/Login");

    var localSpitted = localStorage.getItem("ID").split("|");
    setName(localSpitted[1]);
    axios
      .get(url + "GetAllViaggiOfUser.php?ID=" + localSpitted[0])
      .then(function (response) {
        setViaggi(response.data);
      });
  }, []);

  const [Viaggi, setViaggi] = useState(null);

  return (
    <div>
      <div className="NavBarHome">
        <h4 className="NomeAvatar">{name}</h4>
        <Button onClick={handleClick}>
          <Avatar
            sx={{
              bgcolor: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--DarkBlue"),
            }}
            children={name[0]}
          />
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
            >
              <Button onClick={() => {
                localStorage.setItem("ID", null);
                navigate("/Login");
              }}>
                Logout
                <LogoutIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Popover>
      </div>

      <div className="HomeTitleContainer">
        <h4 className="Title">Bentornato {name} !</h4>
      </div>
      <div className="ViaggiContainer">
        {Viaggi
          ? Viaggi.map((element) => {
            return (
              <div
                className="SingleTrip"
                key={element.ID}
                onClick={() => {
                  localStorage.setItem("Trip", JSON.stringify(element));
                  navigate("/Viaggio");
                }}
              >
                <h1>{element.Nome}</h1>

                <div className="DateContainer">
                  <p className="Paragrafo">
                    <FlightTakeoffIcon className="Icona" />
                    {element.DataInizio}
                  </p>
                  <p className="Paragrafo">
                    <FlightLandIcon className="Icona" />
                    {element.DataFine}
                  </p>

                </div>
                
              </div>
              
            );
          })
          : null}
        <div className="BtnAddContainer">
          <button
            className="BtnAddViaggio"
            onClick={() => {
              navigate("/CreaViaggio");
            }}
          >
            <AddIcon className="AddIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
