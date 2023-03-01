import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { Button, Popover, ButtonGroup, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';


function Home() {
    const [name, setName] = useState('User');
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
        if (localStorage.getItem("ID") == undefined || localStorage.getItem("ID") == null)
            navigate("/Login")


        setName(localStorage.getItem("ID").split('|')[1]);
    }, [])


    const [Viaggi, setViaggi] = useState(null)


    return (
        <div>

            <div className='NavBarHome'>
                <h4 className='NomeAvatar'>{name}</h4>
                <Button onClick={handleClick} ><Avatar sx={{
                    bgcolor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--DarkBlue')
                }} children={name[0]} /></Button>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            '& > *': {
                                m: 1,
                            },
                        }}
                    >

                        <ButtonGroup
                            orientation="vertical"
                            aria-label="vertical contained button group"
                            variant="text"
                        >
                            <Button>Il mio Profilo <PersonIcon /></Button>
                            <Button>Logout<LogoutIcon /></Button>
                        </ButtonGroup>
                    </Box>
                </Popover>
            </div>



            <div className='HomeTitleContainer'>
                <h4 className='Title'>Bentornato {name} !</h4>
            </div>
            <div className='ViaggiContainer'>
                {Viaggi ? Viaggi.forEach(element => {

                }) : <button className='BtnAddViaggio'><AddIcon className='AddIcon' /></button>
                }
            </div>
        </div>
    )
}

export default Home