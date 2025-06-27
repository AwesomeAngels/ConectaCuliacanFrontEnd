
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

function SearchContent({display} : { display: boolean}) {
    const jobs = [
        "Graphic Designer",
        "Digital Marketer",
        "Customer Support Representative",
        "Sales Executive",
        "Human Resources Manager",
        "Electrician",
        "Logistics Coordinator",
        "Administrative Assistant",
        "Data Analyst",
        "Content Writer"
    ];
    const match = useMediaQuery('(min-width: 900px)');
    return (
        <Box display={display ? "block" : "none"} height={match ? "70px" : "200px"} className="bg-gray-100 xl:max-w-[70%] md:max-w-[90%]  max-w-[95%] w-full mx-auto rounded-xl">
            <Grid justifyContent={''} container height={"100%"}>
                <Grid size={{xs : 12, md: 6}}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%" gap={2}>
                        <Icon>search</Icon>
                        <Autocomplete
                            disablePortal
                            options={jobs}
                            size="small"
                            sx={{width: "200px", backgroundColor: "white", borderRadius: "2rem", '& fieldset': { borderRadius: "3rem" }}}
                            renderInput={(params) => <TextField{...params} placeholder="Software engineer"/>}
                        />
                    </Box>
                </Grid>
                <Grid size={{xs : 12, md: 6}}>
                    <Box display={"flex"} flexDirection={match ? "row" : "column"} justifyContent={"center"} gap={2} alignItems={"center"} height={"100%"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
                            <Icon>location_on</Icon>
                            <Autocomplete
                                disablePortal
                                options={jobs}
                                size="small"
                                sx={{width: "200px", backgroundColor: "white", borderRadius: "2rem", '& fieldset': { borderRadius: "3rem" }}}
                                renderInput={(params) => <TextField {...params} placeholder={"Localizacion"}/>}
                            />
                        </Box>
                        <Button sx={{marginLeft: "30px", width: "100px", borderRadius: "2rem"}}  variant={"contained"}>Buscar</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
export default SearchContent;