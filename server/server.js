const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const pg = require('pg');

const config = {
  user: process.env.DB_USER, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PW, 
  host: process.env.DB_HOST, 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000, 
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

const server = express();
const port = process.env.PORT || 5000;

server.use('/', express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.post('/api/userId', (req, res) => {
  if (req.body.token !== 'psy2017psy') {
    res.sendStatus(401);
    return;
  }

  if (req.body.init) {
    res.status(200).send(JSON.stringify({ userId: crypto.randomBytes(20).toString('hex') }));
    return;
  }
  const random = Math.random();
  let expType = 0;
  if (random > 0.5) {
    expType = 1;    // sidebar
  }
  const body = {
    adNo: Math.floor(Math.random() * 5) - 1,
    type: expType,
  };
  pool.query(`UPDATE ${process.env.TABLE_NAME} SET (exp_type, ad_no) = (${body.type}, ${body.adNo}) WHERE user_id = '${req.body.userId}';`, (err, res2) => {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send(JSON.stringify(body));
  });
  
});

server.get('/api/survey', (req, res) => {
  const body = {
    survey: ['我平常有在注意家中客廳的佈置。', '我認為家裡客廳的佈置很棒。', '在看這篇文章之前我就想過要好好佈置客廳。', '為了確定您有認真作答，這題請回答3。'],
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
  if (req.body.query) {
    pool.query(`SELECT EXISTS (SELECT * FROM ${process.env.TABLE_NAME} WHERE user_id = '${req.body.userId}');`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).send(JSON.stringify({ exists: res2.rows[0].exists }));
      return;
    });
  } else if (req.body.init) {
    const major = req.body.major.replace('\'', '').replace('=', '').replace('"', '');
    const age = req.body.age.replace('\'', '').replace('=', '').replace('"', '');
    pool.query(`INSERT INTO ${process.env.TABLE_NAME} (user_id, sex, age, major) VALUES ('${req.body.userId}', '${req.body.sex}', '${age}', '${major}');`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  } else if (req.body.next) {  // posting result
    pool.query(`UPDATE ${process.env.TABLE_NAME} SET (click_time) = (${req.body.time}) WHERE user_id = '${req.body.userId}';`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  } else if (req.body.surveyCheckpoint !== undefined) {
    pool.query(`UPDATE ${process.env.TABLE_NAME} SET (survey_checkpoint) = (${req.body.surveyCheckpoint ? 'true' : 'false'}) WHERE user_id = '${req.body.userId}';`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  } else if (req.body.readTime) {
    pool.query(`UPDATE ${process.env.TABLE_NAME} SET (read_time) = (${req.body.readTime}) WHERE user_id = '${req.body.userId}';`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  } else if (req.body.postSurvey) {
    pool.query(`UPDATE ${process.env.TABLE_NAME} SET (remember_seeing, remember_which, is_affected) = (${req.body.remember === 't' ? 'true' : 'false'}, ${req.body.option}, ${req.body.order}) WHERE user_id = '${req.body.userId}';`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  } else if (req.body.remember) {
    pool.query(`UPDATE ${process.env.TABLE_NAME} SET (remember_seeing) = (${req.body.remember === 't' ? 'true' : 'false'}) WHERE user_id = '${req.body.userId}';`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  } else {
    pool.query(`UPDATE ${process.env.TABLE_NAME} SET (rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank_time, timestamp, timestring) = (${req.body.order[0]}, ${req.body.order[1]}, ${req.body.order[2]}, ${req.body.order[3]}, ${req.body.order[4]}, ${req.body.order[5]}, ${req.body.order[6]}, ${req.body.rankTime}, ${req.body.timestamp}, '${req.body.timestring}') WHERE user_id = '${req.body.userId}';`, (err, res2) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(202);
    });
  }
});

const serverObj = server.listen(port, () => {
  console.log('%s listening on %s', server.name, port);
});
