import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { spawn, ChildProcess } from 'child_process';

let devServer: ChildProcess | null = null;

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

         // Check if server is ready
         if (output.includes('Local:') || output.includes('localhost:5173')) {
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
         if (devServer && !output.includes('localhost:5173')) {
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
