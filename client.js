var fs = require('fs');
var https = require('https');


/* SERVICE CALL REQUEST OPTIONS */

const basicOptions = {
    hostname: 'localhost',
    port: 8080,
    key: fs.readFileSync('./certificates/client/client1-key.pem'),
    cert: fs.readFileSync('./certificates/client/client1-crt.pem'),
    ca: fs.readFileSync('./certificates/ca-crt.pem')
};

function getInvoicesOptions() {
  var copy = {};
  Object.assign(copy, basicOptions);
  copy['path'] = '/invoices';
  copy['method'] = 'GET';
  return copy;
}

function addInvoiceOptions() {
  var copy = {};
  Object.assign(copy, basicOptions);
  copy['path'] = '/invoices/add';
  copy['method'] = 'POST';
  return copy;
}

/* CALLS TO THE SERVICE */

function getInvoices() {
  var req = https.request(getInvoicesOptions(), function(res) {
      res.on('data', function(data) {
          console.log("\nRESPONSE:\n");
          process.stdout.write(data);
      });
  });
  req.end();
  req.on('error', function(e) {
      console.log("Request failed.");
      console.error(e);
  });
}

function addInvoice() {
  var addInvoiceRequest = https.request(addInvoiceOptions(), function(res) {
      res.on('data', function(data) {
          console.log("\nADD-INVOICE RESPONSE:\n");
          process.stdout.write(data);
      });
  });
  addInvoiceRequest.end();
  addInvoiceRequest.on('error', function(e) {
      console.log("POST Request to add invoice failed.");
      console.error(e);
  });
}


/* PROGRAM */
getInvoices();
addInvoice();
