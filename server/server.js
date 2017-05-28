const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Client = require('mariasql');

const connection = Client({
  host: 'localhost',
  port: 3306,
  user: 'userQLU',
  password: 'yTKFO1xTHkGqDrAO',
  database: 'sampledb'
});

const server = express();
const port = 5000;

server.use('/', express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.get('/api/test', (req, res) => {
  connection.query('SELECT * FROM sampledb', (err, rows) => {
    if (err) throw err;
    console.dir(rows);
  })
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

  // TODO: write body into db
  
  res.send(JSON.stringify(body));
});

server.get('/api/survey', (req, res) => {
  console.log('hit');
  const body = {
    // TODO: put all questions into this array
    survey: ['aaa sssssssssss aaaaaaaaww eeqqweww wwwqe qssa', 'bbb', 'aaa sssssaaaaww eeqqweww wwwqe qssa'],
  }
  res.send(JSON.stringify(body));
});

server.get('/api/image', (req, res) => {
  const choiceCount = 7;
  const array = Array(choiceCount);
  for (let i = 0; i < choiceCount; i += 1) {
    array[i] = `/choice/img_${i + 1}.jpg`;
  }
  res.status(200).send(JSON.stringify({ image: array }));
});

server.post('/api/result', (req, res) => {
  console.log(req.body);
  if (req.body.query) {
    // return if req.body.userId is already in db
    res.status(200).send(JSON.stringify({ exist: true }));
    return;
  }
  
  // posting result
  if (req.body.first) {
    // userId, time, type, adNo
  } else {
    // order of choices
  }
  // this should be the callback
  res.status(202).send('ok');
});

const serverObj = server.listen(port, () => {
  console.log('%s listening on %s', server.name, port);
});
