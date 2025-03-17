# Running Instructions

1. Running via docker, cd into main diractory then run -   `docker-compose up`.

2. Running locally: <br/>
    2.1. cd into server dir and run `npm install`  then `node data/insertEmployees.js && node server.js`. <br/>
    2.2. cd into client dir and run `npm install`  then `npm run dev`. (node v18)<br/>


<br />
<br />

# Clarifications   
1. You can login and test the app with 3 users located in server/data/employees.json <br />

    * Username: <strong>nstark</strong>, Password: <strong>1234</strong> (manager of jstark and astark)
    * Username: <strong>jstark</strong>, Password: <strong>12345</strong> (nstark manager)
    * Username: <strong>astark</strong>, Password: <strong>123456</strong> (nstark manager)

