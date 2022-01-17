import { readFile } from 'fs/promises';
import express from 'express';

const app = express();

async function read(req, res) {
  let data = '';

    data = await readFile('./10.async-awaitx.js');


  // Ef við köstum þessari villu og pössum ekki upp á að grípa mun
  // forritið okkar krassa. Á við um allar villur utan try catch í
  // async middleware!
  // throw new Error('boo');

  return res.type('txt').send(data);
}

/**
 * Wrap an async function with error handling
 * @params {function} fn Function to wrap
 * @returns {Promise} Promise with error handling
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

// Grípum villur og erum örugg
app.get('/', catchErrors(read));

// Ónei! Villur munu krassa forritinu okkar
app.get('/unsafe', read);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
