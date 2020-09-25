** DESCRIPTION **
This is a sample of creating a containerised service using MongoDB. It contains:
1. Server side:
- index.js (service)
- Dockerfile (for the server)
- mongodb_database.js
- docker-compose.yml (composes the service and the database volume)

2. Client
- Code to make requests

3. Certificates to allow that client and service can securely communicate.


** HOW TO RUN **
- To launch the service run 'docker-compose up'
- To launch the client, from a separate console tab run 'node ./client.js'

** ABOUT THE CERTIFICATES **
They were generated following the instructions from:
- https://engineering.circle.com/https-authorized-certs-with-node-js-315e548354a2
- https://flaviocopes.com/express-https-self-signed-certificate/
