const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');

const server = express();
const port = 5000;

let article = '';
 fs.readFile('./public/text.txt', (err, data) => {
   if (err) {
     console.error(err);
     return;
   }
   article = data.toString();
 })

server.use('/', express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.get('/api/text', (req, res) => {
  res.status(200).send(JSON.stringify({ text: article }));
});

server.get('/api/userId', (req, res) => {
  const random = Math.random();
  let expType = -1;
  if (random < 0.6 && random >= 0.2) {
    expType = 0;    // popup
  } else if (random > 0.6) {
    expType = 1;    // sidebar
  }
  const body = {
    userId: crypto.randomBytes(20).toString('hex'),
    adNo: Math.floor(Math.random() * 4),
    type: expType,
  };
  
  res.send(JSON.stringify(body));
});

server.get('/api/survey', (req, res) => {
  console.log('hit');
  const body = {
    survey: ['aaa sssssssssss aaaaaaaaww eeqqweww wwwqe qssa', 'bbb', 'aaa sssssaaaaww eeqqweww wwwqe qssa'],
  }
  res.send(JSON.stringify(body));
});

server.get('/api/image', (req, res) => {
  res.status(200).send(JSON.stringify({ image: [...Array(7)]}));
});

server.post('/api/result', (req, res) => {
  console.log(req.body);
  if (req.body.query) {
    res.status(200).send(JSON.stringify({ exist: true }));
    return;
  }
  res.status(202).send('ok');
});

const serverObj = server.listen(port, () => {
  console.log('%s listening on %s', server.name, port);
});
