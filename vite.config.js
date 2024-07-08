import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   server: {
//       host: 'local.fluid-react.com',
//       https: {
//           key: fs.readFileSync('./.certs/server.key'),
//           cert: fs.readFileSync('./.certs/server.crt'),
//       },
//       port: 7227,
//   }
})
