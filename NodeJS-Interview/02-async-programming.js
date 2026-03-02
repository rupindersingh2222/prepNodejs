// ============================================
// ASYNCHRONOUS PROGRAMMING - INTERVIEW EXAMPLES
// ============================================

// 1. CALLBACKS
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John' };
    callback(null, data);
  }, 1000);
}

// Usage
fetchData((error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
});

// 2. CALLBACK HELL (PYRAMID OF DOOM)
function callbackHell() {
  fetchData((err1, data1) => {
    if (err1) console.error(err1);
    else {
      fetchData((err2, data2) => {
        if (err2) console.error(err2);
        else {
          fetchData((err3, data3) => {
            console.log('All data:', data1, data2, data3);
          });
        }
      });
    }
  });
}

// 3. PROMISES
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: 'John' });
      } else {
        reject('Error fetching data');
      }
    }, 1000);
  });
}

// Usage with .then() and .catch()
fetchDataPromise()
  .then(data => {
    console.log('Success:', data);
    return data;
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Operation complete');
  });

// 4. PROMISE CHAINING
fetchDataPromise()
  .then(data => {
    console.log('First data:', data);
    return fetchDataPromise(); // Return another promise
  })
  .then(data => {
    console.log('Second data:', data);
  })
  .catch(error => console.error('Error:', error));

// 5. PROMISE.ALL
Promise.all([fetchDataPromise(), fetchDataPromise(), fetchDataPromise()])
  .then(results => {
    console.log('All promises resolved:', results);
  })
  .catch(error => {
    console.error('One or more promises rejected:', error);
  });

// 6. PROMISE.RACE
Promise.race([fetchDataPromise(), fetchDataPromise()])
  .then(result => {
    console.log('First promise resolved:', result);
  })
  .catch(error => console.error('Error:', error));

// 7. ASYNC/AWAIT
async function fetchDataAsync() {
  try {
    const data1 = await fetchDataPromise();
    console.log('Data 1:', data1);
    
    const data2 = await fetchDataPromise();
    console.log('Data 2:', data2);
    
    return { data1, data2 };
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
fetchDataAsync().then(result => console.log('Result:', result));

// 8. PARALLEL ASYNC OPERATIONS
async function parallelOperations() {
  try {
    // Execute all at once
    const [data1, data2, data3] = await Promise.all([
      fetchDataPromise(),
      fetchDataPromise(),
      fetchDataPromise()
    ]);
    console.log('All data:', data1, data2, data3);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 9. SEQUENTIAL VS PARALLEL
// Sequential (slower)
async function sequential() {
  const start = Date.now();
  await fetchDataPromise(); // 1 second
  await fetchDataPromise(); // 1 second
  await fetchDataPromise(); // 1 second
  console.log('Sequential took:', Date.now() - start); // ~3 seconds
}

// Parallel (faster)
async function parallel() {
  const start = Date.now();
  await Promise.all([
    fetchDataPromise(), // All run at once
    fetchDataPromise(),
    fetchDataPromise()
  ]);
  console.log('Parallel took:', Date.now() - start); // ~1 second
}

// 10. ASYNC ITERATION
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

// Usage
(async () => {
  for await (const value of asyncGenerator()) {
    console.log('Async iterator value:', value);
  }
})();

// 11. CONVERTING CALLBACK TO PROMISE (Promisify)
const util = require('util');

function oldStyleCallback(name, callback) {
  setTimeout(() => {
    callback(null, `Hello, ${name}!`);
  }, 1000);
}

const promisifiedFunc = util.promisify(oldStyleCallback);

promisifiedFunc('John')
  .then(result => console.log(result))
  .catch(error => console.error(error));

// 12. HANDLING MULTIPLE ERRORS
async function multipleErrors() {
  try {
    await Promise.all([
      fetchDataPromise(),
      new Promise((_, reject) => reject('Error 1')),
      new Promise((_, reject) => reject('Error 2'))
    ]);
  } catch (error) {
    console.error('Caught error:', error); // Only first error
  }
}

// 13. TIMEOUT WRAPPER
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

// Usage
withTimeout(fetchDataPromise(), 500)
  .then(data => console.log(data))
  .catch(error => console.error(error)); // Timeout error
