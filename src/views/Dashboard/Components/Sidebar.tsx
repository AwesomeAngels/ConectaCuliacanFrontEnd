import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

import listElements, { bottomLinks } from '../../../constants/SidebarLinks.ts';
function Sidebar() {
    
    return (
        <Drawer
            anchor={"left"}
            variant="permanent"
        >
            <Box sx={{width: 250}}>
                <List>
                    {listElements.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton className="flex items-center gap-x-6">
                                <Icon>{item.icon}</Icon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <List sx={{position: 'absolute', bottom: 0, width: '100%'}}>
                    {bottomLinks.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton className="flex items-center gap-x-6">
                                <Icon>{item.icon}</Icon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar;