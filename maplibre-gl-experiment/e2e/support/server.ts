import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { spawn, ChildProcess } from 'child_process';

let devServer: ChildProcess | null = null;
export let devServerPort: string = '5173'; // Default fallback

BeforeAll({ timeout: 60000 }, async function () {
   console.log('Starting dev server...');

   return new Promise<void>((resolve, reject) => {
      devServer = spawn('npm', ['run', 'dev'], {
         stdio: 'pipe',
         shell: true,
      });

      let output = '';

      devServer.stdout?.on('data', (data) => {
         output += data.toString();
         console.log(data.toString());

         // Extract port from output (e.g., "Local: http://localhost:5173/")
         const portMatch = output.match(/localhost:(\d+)/);
         if (portMatch) {
            devServerPort = portMatch[1];
            console.log(`Detected dev server port: ${devServerPort}`);
         }

         // Check if server is ready
         if (output.includes('Local:') || portMatch) {
            console.log('Dev server is ready!');
            // Wait a bit more for the server to fully initialize
            setTimeout(() => resolve(), 2000);
         }
      });

      devServer.stderr?.on('data', (data) => {
         console.error(data.toString());
      });

      devServer.on('error', (error) => {
         console.error('Failed to start dev server:', error);
         reject(error);
      });

      // Timeout if server doesn't start
      setTimeout(() => {
         if (devServer && !output.match(/localhost:\d+/)) {
            reject(new Error('Dev server failed to start within 60 seconds'));
         }
      }, 60000);
   });
});

AfterAll(async function () {
   if (devServer) {
      console.log('Stopping dev server...');
      devServer.kill();
      devServer = null;
   }
});
