### Exercise | Anomaly Detections
1. Run the following script that simulates a failure in the *BookingService*. Wait a couple of minutes.

`./simulate/enable500.sh`

2. Check the failure rate of the *BookingService*, it should start failing. This situation will not raise an alert, discuss
with your lab why.

3. To avoid false positives, Dynatrace doesn't alert if the service load is less than 10 request/min. If you've an important
service with these condition it's suggested to reduce the number to 0 request/min. Globally or specifically for the service? 
Discuss with the class.

<div align="center">
<img width="400" src="img/6.png">
</div>

4. Understand the root cause of the issue and fix it running the following script

`./simulate/disable500.sh`