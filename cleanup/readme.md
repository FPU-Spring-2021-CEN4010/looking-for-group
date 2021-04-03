This process is configured to be kept running my PM2:
With PM2 installed, run 'pm2 start app' and it will trigger to keep running. 
If you use the extended keep-alive from PM2, you may need to run 'pm2 save' to keep it actvie with a server reboot.

As long as the process has been started, the cleaner will run and clean up advertisments and active-users which were created greater than 24 hours previously. 
This process utilizes several environement variables. Those being: 

     CL_USER        -    The username or email of the authorized user.
     CL_PASS        -    The password of the authorized user.
     RUNTIME_HR     -    The hour for the process to run.
     RUNTIME_MIN    -    The minute for the process to run.