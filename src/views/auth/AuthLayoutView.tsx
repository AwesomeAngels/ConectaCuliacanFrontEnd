/* Library imports */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";

function AuthLayoutView() {
    return (
        <>
            <Box className="grid xl:grid-cols-2 h-screen">
                <Container component="main" className="flex flex-col justify-center items-center h-full">
                    <Box className="md:flex md:flex-col md:gap-y-2 md:w-full">
                        <Box
                            className="justify-center text-center w-[300px] h-[100px] mx-auto"
                            component="img"
                            src="/src/assets/Logo.png"
                        />
                        <Outlet />
                    </Box>
                </Container>

                <Box className="hidden xl:block">
                    <img className="w-full h-screen" src="/src/assets/bg.jpg" alt="Imagen de fondo" />
                </Box>
            </Box>
            <Box></Box>
        </>
    )
}

export default AuthLayoutView;
