import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { AppProvider } from "@toolpad/core";
import { store } from './store'
import { createTheme} from "@mui/material";
import App from './App.tsx'
const customTheme = createTheme();
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppProvider theme={customTheme}>
            <StrictMode>
                <App />
            </StrictMode>
        </AppProvider>
    </Provider>
)
