import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useMediaQuery from '@mui/material/useMediaQuery';

function Footer(){
    const md = useMediaQuery('(min-width: 900px)');
    const mdXs = useMediaQuery('(min-width: 700px)');
    return(
        <footer className={"flex flex-col items-center mt-2 bg-blue-900 p-7 w-full gap-y-5"}>
            <Box display="flex" alignItems={!md ? "center" : "normal"} flexDirection={!md ? 'column' : 'row'} width={md ? "100%" : "auto"} gap={5}>
                <Box className="w-full" textAlign={!md ? 'center' : 'left'}>
                    <Typography variant={'h2'} color={'white'} fontWeight={400}>Conecta Sinaloa</Typography>
                    <Typography variant={"h5"} color={'white'} fontWeight={400}>Conecta talento con oportunidades.</Typography>
                </Box>
                <Box display="flex" flexDirection={mdXs ? "row" : "column"} width={mdXs ? "100%" : "auto"} justifyContent="center" columnGap={6} gap={3}>
                    <Box className={"flex flex-col"}>
                        <Typography marginBottom={1} color='white' fontWeight={400} variant={'h5'}>Sobre nosotros</Typography>
                        <Box className="flex flex-col justify-center">
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Mision</Typography>
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Vision</Typography>
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Publicacion periodica</Typography>
                        </Box>
                    </Box>
                    <Box className={"flex flex-col"}>
                        <Typography marginBottom={1} color='white' fontWeight={400} variant={'h5'}>Soporte</Typography>
                        <Box className="flex flex-col justify-center">
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Contacto</Typography>
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Politicas de reembolso</Typography>
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>FAQ'S</Typography>
                        </Box>
                    </Box>
                    <Box className={"flex flex-col"}>
                        <Typography marginBottom={1} color='white' fontWeight={400} variant={'h5'}>Redes</Typography>
                        <Box className="flex flex-col justify-center">
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Instagram</Typography>
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Youtube</Typography>
                            <Typography fontWeight={300} color={'white' } variant={'h6'}>Facebook</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={"w-full"}>
                <Divider sx={{ bgcolor: "white" }}></Divider>
            </Box>

            <Box display={"flex"} flexDirection={mdXs ? "row" : "column"} alignItems={"center"} justifyContent={mdXs ? "space-between" : 'center'} width={"100%"}>
                <Box display={'flex'} flexDirection={mdXs ? "row" : "column"} justifyContent={mdXs ? "space-between" : "center"} width={mdXs ? "100%" : "auto"} columnGap={10} gap={3}>
                    <Typography color='white' fontWeight={400} variant={'h5'}>Copyright </Typography>
                    <Typography color='white' fontWeight={400} variant={'h5'}>Terminos de servicio</Typography>
                    <Typography marginLeft={ mdXs ? 'auto' : "unset"} color='white' fontWeight={400} variant={'h5'}>Volver arriba</Typography>
                </Box>

            </Box>
        </footer>
    )
}

export default Footer;