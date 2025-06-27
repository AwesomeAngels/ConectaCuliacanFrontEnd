import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import UseMediaQuery from '@mui/material/useMediaQuery';
import Icon from '@mui/material/Icon';
import Search from './Components/SearchContent.tsx';
import Navigation from './Components/Navigation.tsx';

import './Styles/animation.css'

function JobView(){
    const match = UseMediaQuery('(min-width: 900px)');
    const [isSticky, setIsSticky] = useState(false);

    const scrollHandler = (e : React.UIEvent<HTMLElement>) => {
        const top = e.currentTarget.scrollTop;
        if(top > 300){
            //Set sticky
            setIsSticky(true);
        }
        if(top < 200){
            setIsSticky(false);
        }
    }
    return(
        <>
            <Navigation/>
            <Search display={match}/>
            <Box className="w-full max-w-[95%] mx-auto mt-1">
                <Grid container spacing={2}>
                    <Grid display={match ? 'block' : 'none'} size={{md: 5}} className="overflow-y-auto h-[500px]">
                        <Card className="p-3">
                            <CardContent className="flex flex-col gap-y-1 hover:cursor-pointer">
                                <Typography fontSize={25} fontWeight={500}>Software Engineer</Typography>
                                <Typography>Culiacan, Sinaloa</Typography>
                                <Typography>Cresol Internacional, S.A. DE C.V.</Typography>
                                <Typography>Presencial - Remoto</Typography>
                                <Typography>Hace 2 horas</Typography>
                            </CardContent>
                            <Divider></Divider>
                            <CardContent className="flex flex-col gap-y-1 hover:cursor-pointer">
                                <Typography fontSize={25} fontWeight={500}>Software Engineer</Typography>
                                <Typography>Culiacan, Sinaloa</Typography>
                                <Typography>Cresol Internacional, S.A. DE C.V.</Typography>
                                <Typography>Presencial - Remoto</Typography>
                                <Typography>Hace 2 horas</Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid size={{xs: 12,md: 7}}>
                        <Card className="p-3">
                            <CardContent className="h-full p-3 relative" sx={{maxHeight: match ? '83dvh' : "90dvh", overflowY: 'auto'}} onScroll={scrollHandler}>
                                <Box  height={isSticky ? 77 : 0} zIndex={1}  position={"sticky"} top={-17.5} className={`transition-height bg-white w-full`} display="flex">
                                    <Box display="flex" alignItems={"center"} className={`transition-opacity ${isSticky ? "transition-opacity-done" : ""}`} columnGap={7}>
                                        <Box>
                                            <Typography fontSize={18}  fontWeight={500}>Software Engineer</Typography>
                                            <Box display='flex' columnGap={1}>
                                                <Typography className="text-gray-400">Culiacan, Sinaloa</Typography>
                                                <Typography component="span" className="text-gray-400">•</Typography>
                                                <Typography className="text-gray-400">Cresol Internacional</Typography>
                                            </Box>
                                        </Box>
                                        <Button sx={{paddingX : "1rem",height: "40px", borderRadius: 10}} variant="contained">Postularme</Button>
                                    </Box>
                                </Box>
                                <Icon sx={{fontSize : 30, cursor: "pointer", display: match ? "none" : 'block'}}>arrow_back</Icon>
                                <Box  alignItems={'center'} className="bg-white"  paddingY={1}>
                                    <Typography fontSize={match ? 25 : 20}  fontWeight={500}>Software Engineer</Typography>
                                    <Box display="flex" gap={1}>
                                        <Typography className="text-gray-400">Culiacan, Sinaloa</Typography>
                                        <Typography component="span" className="text-gray-400">•</Typography>
                                        <Typography className="text-gray-400">hace 2 dias.</Typography>
                                    </Box>
                                    <Box display="flex" gap={2} alignItems="center" sx={{marginTop: isSticky ? "0px" : "1rem"}}>
                                        <Button sx={{paddingY: ".5rem",paddingX: "1rem", borderRadius: 10}} variant="contained">Postularme</Button>
                                        <Button sx={{paddingY: ".5rem",paddingX: "2rem", borderRadius: 10}} variant="contained"><Icon>more_vert</Icon></Button>
                                    </Box>
                                    <Divider sx={{marginY: "1rem"}}></Divider>
                                </Box>
                                <Box className="flex flex-col gap-y-3">
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Icon sx={{color: "gray"}}>work</Icon>
                                            <Typography className="text-gray-600">Contrato por tiempo indeterminado</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Icon sx={{color: "gray"}}>timer</Icon>
                                            <Typography className="text-gray-600">Tiempo completo</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Icon sx={{color: "gray"}}>apartment</Icon>
                                            <Typography className="text-gray-600">Híbrido (Ciudad de México / Trabajo Remoto parcial)</Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography className="text-black" fontSize={25}>Descripcion: </Typography>
                                        <Typography>En TechNova Solutions, estamos buscando un Desarrollador .NET apasionado y orientado a resultados para unirse a nuestro equipo de ingeniería. Trabajarás en el desarrollo y mantenimiento de aplicaciones empresariales escalables utilizando el stack de tecnologías Microsoft. El rol requiere una combinación de habilidades técnicas sólidas, buenas prácticas de desarrollo y capacidad para trabajar en equipo en un entorno ágil.</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className="text-black" fontSize={25}>Responsabilidades: </Typography>
                                        <Typography>- Desarrollar, probar y mantener aplicaciones web y APIs utilizando C# y ASP.NET Core.</Typography>
                                        <Typography>- Participar en el diseño de soluciones técnicas junto con arquitectos y otros desarrolladores.</Typography>
                                        <Typography>- Escribir código limpio, eficiente y documentado, siguiendo principios SOLID y patrones de diseño.</Typography>
                                        <Typography>- Colaborar con equipos de QA, producto y diseño para entregar soluciones de calidad.</Typography>
                                        <Typography>- Participar activamente en revisiones de código y mejora continua del equipo.</Typography>
                                        <Typography>- Implementar integraciones con servicios externos vía RESTful APIs.</Typography>
                                        <Typography>- Participar en despliegues CI/CD utilizando Azure DevOps o herramientas similares.</Typography>
                                    </Box>

                                    <Box>
                                        <Typography className="text-black" fontSize={25}>Requisitos: </Typography>
                                        <Box>
                                            <Typography>- Licenciatura en Ingeniería en Sistemas, Informática o carrera afín.</Typography>
                                            <Typography>- 2+ años de experiencia con C# y ASP.NET Core (preferentemente .NET 6 en adelante).</Typography>
                                            <Typography>- Conocimiento sólido en desarrollo de APIs RESTful.</Typography>
                                            <Typography>- Experiencia con bases de datos relacionales, especialmente SQL Server.</Typography>
                                            <Typography>- Familiaridad con Entity Framework Core.</Typography>
                                            <Typography>- Uso de control de versiones con Git.</Typography>
                                            <Typography>- Experiencia trabajando en metodologías ágiles (Scrum o Kanban).</Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography className="text-black" fontSize={25}>Lo que ofrecemos: </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            • Horario flexible y esquema híbrido (3 días remoto / 2 días oficina).
                                        </Typography>

                                        <Typography variant="body1" gutterBottom>
                                            • Plan de desarrollo profesional y acceso a certificaciones Microsoft.
                                        </Typography>

                                        <Typography variant="body1" gutterBottom>
                                            • Prestaciones superiores a las de ley (vales, seguro de gastos médicos mayores, etc.).
                                        </Typography>

                                        <Typography variant="body1" gutterBottom>
                                            • Ambiente de trabajo colaborativo, inclusivo y con enfoque en resultados.
                                        </Typography>

                                        <Typography variant="body1" gutterBottom>
                                            • Clases de inglés y acceso a plataformas de aprendizaje.
                                        </Typography>
                                    </Box>
                                    <Box className="border p-6 border-gray-300 rounded-2xl">
                                        <Typography className="text-black" fontSize={25}>Acerca de la empresa</Typography>
                                        <Box display="flex" gap={2} alignItems="center">
                                            <img className="w-[80px] h-[80px]" src="https://img.freepik.com/premium-vector/software-company-logo-design_1005794-6755.jpg?semt=ais_hybrid"/>
                                            <Box>
                                                <Typography fontSize={18}>TechNova Solutions</Typography>
                                                <Typography fontSize={16}>929,423 seguidores</Typography>
                                            </Box>
                                            <Button sx={{marginLeft: "auto", paddingX : "2rem",borderRadius: "1rem"}} variant="contained"><Icon>add</Icon>Seguir</Button>
                                        </Box>
                                        <Box marginTop={2}>
                                            <Typography className="text-gray-500">En TechNova Solutions creemos que la tecnología es un catalizador para transformar negocios y mejorar la vida de las personas. Somos una empresa mexicana especializada en desarrollo de software a la medida, enfocada en construir soluciones digitales modernas y escalables para empresas de todos los tamaños.

                                                Desde 2018, ayudamos a nuestros clientes a automatizar procesos, integrar sus sistemas y lanzar productos digitales que realmente marcan la diferencia. Nos especializamos en tecnologías Microsoft (.NET, Azure, SQL Server), así como en arquitecturas modernas basadas en microservicios, APIs RESTful y metodologías ágiles.

                                                Nuestro equipo está conformado por ingenieros de software apasionados, diseñadores UX/UI y especialistas en nube, todos con un objetivo en común: crear soluciones tecnológicas que realmente aporten valor.</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default JobView;