import React , { useState } from 'react';
import AppBar  from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from "@mui/material/useMediaQuery";
import Icon from '@mui/material/Icon'
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from "../../../../hooks.ts";

function Navigation(){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const md = useMediaQuery("(min-width: 850px)");
    const user = useAppSelector((state) => state.userReducer);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <AppBar position="sticky" sx={{boxShadow: 'none'}}>
            <Toolbar className={md ? "flex justify-around items-center gap-x-5" : "flex-row-reverse justify-end items-center gap-x-4" } sx={{backgroundColor: 'white'}}>
                <Typography display={md ? "none" : "block"} className="text-black">Opciones</Typography>
                <Box display={md ? "flex" : "none" } alignItems="center" gap={3} >
                    <Typography component={Link} to="/jobs" className="text-gray-600">Trabajos</Typography>
                    <Typography className="text-gray-600">Empresas</Typography>
                    <Typography className="text-gray-600">Resumen</Typography>
                    <Typography className="text-gray-600">Precio</Typography>
                </Box>
                <Box display={md ? "flex" : "none" } alignItems="center" gap={3}>
                    {user.isLoggedIn && (
                        <Avatar className="cursor-pointer" component={Link} to="/profile" alt="user avatar"/>
                    )}
                    {!user.isLoggedIn && (
                        <>
                            <Typography className="text-blue-700" component={Link} to='/login'>Iniciar sesion</Typography>
                            <Typography className="text-blue-700">|</Typography>
                            <Typography className="text-blue-700">Registrarse</Typography>
                        </>
                    )}
                </Box>
                <Icon onClick={handleClick} sx={{fontSize: 40, display: !md ? "block" : "none"}} className="text-blue-500">menu</Icon>
                <Menu  sx={{display: !md ? "block" : "none"}} anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem>Trabajos</MenuItem>
                    <MenuItem>Empresas</MenuItem>
                    <MenuItem>Resumen</MenuItem>
                    {user.isLoggedIn && (
                        <MenuItem>Perfil</MenuItem>
                    )}
                    {!user.isLoggedIn && (
                        <Box>
                            <MenuItem>Iniciar sesion</MenuItem>
                            <MenuItem>Registrarse</MenuItem>
                        </Box>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>

    )
}

export default Navigation;