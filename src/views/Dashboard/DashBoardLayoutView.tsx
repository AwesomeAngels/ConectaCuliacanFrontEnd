import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navigation from './Components/Navigation.tsx';
import SearchContent from './Components/SearchContent.tsx';
import Footer from './Components/Footer';
import UseMediaQuery from "@mui/material/useMediaQuery";
function DashBoardLayoutView(){
    const match = UseMediaQuery('(min-width: 900px)');

    return(
        <Box className="">
            <Navigation/>
            <Box>
                <SearchContent display={match} />
                <Outlet/>
                <Footer></Footer>
            </Box>

        </Box>
    )
}

export default DashBoardLayoutView;