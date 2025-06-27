import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Test(){
    return(
        <>
            <h1>This is the test view</h1>

            <Grid container>
                <Grid size={6}>
                    <Box className={"w-[300px h-[300px] bg-blue-600"}></Box>
                </Grid>
                <Grid size={6}>
                    <Box className={"w-[300px h-[300px] bg-green-600"}></Box>
                </Grid>
            </Grid>

        </>
    )
}

export default Test