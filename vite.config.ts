import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()],
    server: {
        // Specify the development server port
        port: 5013,
    },
    // Base name of your app
    base: "/", // Replace this with the subdirectory path if needed
})
