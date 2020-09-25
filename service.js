const express = require('express');
const Request = require('request');
var fs = require('fs');
var https = require('https');
const mongodb = require('mongodb').MongoClient;
const setupDataBase = require('./mongodb_database');
const axios = require('axios');

/** CODE */
main();
/*********/

function startServer(port) {
  var options = {
    key: fs.readFileSync('./certificates/invoice-service/server-key.pem'),
    cert: fs.readFileSync('./certificates/invoice-service/server-crt.pem'),
    ca: fs.readFileSync('ca-crt.pem'),
    requestCert: true,
    rejectUnauthorized: true
  };
  const newApp = express();
  return new Promise(resolve => {
      https.createServer(options, newApp).listen(port);
      console.log('- Server up and running on ' + port + '.');
      resolve(newApp);
  });
}

async function main() {
  const dbURL = 'mongodb://mongo:27017/mongo-test';
  const db = await setupDataBase(mongodb, dbURL);
  const app = await startServer(8080);
  app.get('/', (req, res) => {
    res.send({'author' : 'Borja Arias',
              'age' : 25
    });
  });

  app.get('/invoices', (req, res) => {
    db.collection('invoices').find().toArray()
    .then(results => {
      res.send(results);
    })
    .catch(error => {
      res.send('ERROR!!!!!');
    })
  });

  app.get('/google', (req, res) => {
    axios.get('https://www.google.com')
    .then(response => {
      console.log(response.data);

    })
    .catch(error => {
      console.log(error);
    });
  });

  app.post('/invoices/add', (req, res) => {
    const invoicesCollection = db.collection('invoices');
    invoicesCollection.insertOne({'date' : '30/04/2020',
                                  'amount' : 3783.22})
                                .then(result => {console.log(result);})
                                .catch(error => console.error(error))
    res.send('All good my friend.');
  });
}
