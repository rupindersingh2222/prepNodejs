// ============================================
// HTTP CLIENT EXAMPLES - NODE.JS
// ============================================

// 1. USING BUILT-IN HTTP MODULE
// -----------------------------
// This shows how to perform a GET and POST request using the
// native `http` or `https` module (no dependencies required).

const http = require('http');
const https = require('https');

// simple GET request (http or https depending on URL)
function getWithNative(url) {
  const lib = url.startsWith('https') ? https : http;
  lib
    .get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Native GET response:', data);
      });
    })
    .on('error', (err) => {
      console.error('Native GET error:', err.message);
    });
}

// simple POST request with JSON body
function postWithNative(url, payload) {
  const lib = url.startsWith('https') ? https : http;
  const parsed = new URL(url);
  const options = {
    method: 'POST',
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(payload)),
    },
  };

  const req = lib.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Native POST response:', data);
    });
  });

  req.on('error', (err) => {
    console.error('Native POST error:', err.message);
  });

  req.write(JSON.stringify(payload));
  req.end();
}

// ====== 2. USING AXIOS =====
// npm install axios
const axios = require('axios');

async function getWithAxios(url) {
  try {
    const resp = await axios.get(url);
    console.log('Axios GET response:', resp.data);
  } catch (err) {
    console.error('Axios GET error:', err.message);
  }
}

async function postWithAxios(url, payload) {
  try {
    const resp = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Axios POST response:', resp.data);
  } catch (err) {
    console.error('Axios POST error:', err.message);
  }
}

// ====== 3. USING REQUEST (DEPRECATED) =====
// npm install request
const request = require('request');

function getWithRequest(url) {
  request.get(url, { json: true }, (err, res, body) => {
    if (err) {
      return console.error('Request GET error:', err.message);
    }
    console.log('Request GET response:', body);
  });
}

function postWithRequest(url, payload) {
  request.post(
    {
      url,
      json: payload,
    },
    (err, res, body) => {
      if (err) {
        return console.error('Request POST error:', err.message);
      }
      console.log('Request POST response:', body);
    }
  );
}

// ======= USAGE EXAMPLES =======
// Replace with a real endpoint when testing
const testUrl = 'https://jsonplaceholder.typicode.com/posts';

// native
getWithNative(testUrl);
postWithNative(testUrl, { title: 'foo', body: 'bar', userId: 1 });

// axios
getWithAxios(testUrl);
postWithAxios(testUrl, { title: 'foo', body: 'bar', userId: 1 });

// request
getWithRequest(testUrl);
postWithRequest(testUrl, { title: 'foo', body: 'bar', userId: 1 });
