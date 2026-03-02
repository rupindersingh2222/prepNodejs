// ============================================
// EVENT LOOP & PROCESS - INTERVIEW EXAMPLES
// ============================================

// ===== 1. EVENT LOOP PHASES =====
console.log('===== EVENT LOOP PHASES =====\n');

// Phase 1: TIMERS
setTimeout(() => {
  console.log('setTimeout (Timer phase)');
}, 0);

// Phase 2: I/O CALLBACKS
const fs = require('fs');
fs.readFile(__filename, () => {
  console.log('fs.readFile (I/O Callbacks phase)');
});

// Phase 3: CHECK
setImmediate(() => {
  console.log('setImmediate (Check phase)');
});

// Phase 4: CLOSE
process.nextTick(() => {
  console.log('process.nextTick (Before any phase)');
});

// Execution order example (add all together):
// 1. process.nextTick
// 2. setTimeout (Timers)
// 3. fs.readFile (I/O Callbacks)
// 4. setImmediate (Check)

// ===== 2. PROCESS.NEXTTICK VS SETIMMEDIATE =====
console.log('\n===== NEXTTICK vs SETIMMEDIATE =====\n');

console.log('Start');

process.nextTick(() => {
  console.log('nextTick 1');
});

setImmediate(() => {
  console.log('setImmediate 1');
});

process.nextTick(() => {
  console.log('nextTick 2');
});

setImmediate(() => {
  console.log('setImmediate 2');
});

console.log('End');

// Output:
// Start
// End
// nextTick 1
// nextTick 2
// setImmediate 1
// setImmediate 2

// ===== 3. MICROTASK VS MACROTASK =====
console.log('\n===== MICROTASK vs MACROTASK =====\n');

// Microtasks (execute first)
Promise.resolve().then(() => {
  console.log('Promise (Microtask)');
});

process.nextTick(() => {
  console.log('nextTick (Microtask)');
});

// Macrotask (execute after all microtasks)
setTimeout(() => {
  console.log('setTimeout (Macrotask)');
}, 0);

setImmediate(() => {
  console.log('setImmediate (Macrotask)');
});

// Output order:
// nextTick (Microtask queue runs before timers)
// Promise (Microtask queue)
// setTimeout (Timer phase)
// setImmediate (Check phase)

// ===== 4. MULTIPLE NEXTTICK IN MICROTASK =====
console.log('\n===== MULTIPLE NEXTTICK =====\n');

setImmediate(() => {
  console.log('setImmediate');
});

process.nextTick(() => {
  console.log('nextTick 1');
  process.nextTick(() => {
    console.log('nextTick 2 (nested)');
  });
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

// Output:
// nextTick 1
// nextTick 2 (nested) - nextTick queued inside nextTick executes before timer
// setTimeout
// setImmediate

// ===== 5. COMPLEX EVENT LOOP EXAMPLE =====
console.log('\n===== COMPLEX EVENT LOOP =====\n');

function complexExample() {
  console.log('1. Script start');

  setTimeout(() => {
    console.log('2. setTimeout 1');
    Promise.resolve().then(() => {
      console.log('3. Promise inside setTimeout');
    });
  }, 0);

  Promise.resolve().then(() => {
    console.log('4. Promise 1');
    process.nextTick(() => {
      console.log('5. nextTick inside Promise');
    });
  });

  process.nextTick(() => {
    console.log('6. nextTick 1');
  });

  setImmediate(() => {
    console.log('7. setImmediate 1');
  });

  console.log('8. Script end');
}

// Output order:
// 1. Script start
// 8. Script end
// 6. nextTick 1
// 4. Promise 1
// 5. nextTick inside Promise
// 2. setTimeout 1
// 3. Promise inside setTimeout
// 7. setImmediate 1

// ===== 6. UNDERSTANDING BLOCKING =====
console.log('\n===== BLOCKING vs NON-BLOCKING =====\n');

// This blocks the event loop
setTimeout(() => {
  console.log('These operations will be delayed');
}, 0);

// Heavy computation
for (let i = 0; i < 1e9; i++) {
  // Blocking operation
}

console.log('After heavy computation');

// ===== 7. PROCESS OBJECT =====
console.log('\n===== PROCESS OBJECT =====\n');

console.log('Process version:', process.version);
console.log('Node version:', process.versions.node);
console.log('V8 version:', process.versions.v8);
console.log('Process ID:', process.pid);
console.log('Platform:', process.platform); // 'win32', 'linux', 'darwin', etc
console.log('Architecture:', process.arch); // 'x64', 'arm', etc
console.log('Environment:', process.env.NODE_ENV);

// ===== 8. PROCESS EVENTS =====
console.log('\n===== PROCESS EVENTS =====\n');

process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});

// ===== 9. MEMORY MANAGEMENT =====
console.log('\n===== MEMORY USAGE =====\n');

const memUsage = process.memoryUsage();
console.log('Memory Usage:', {
  rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',      // Resident set size
  heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB',
  heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
  external: Math.round(memUsage.external / 1024 / 1024) + ' MB'
});

// Force garbage collection (if started with --expose-gc)
// if (global.gc) global.gc();

// ===== 10. CPU USAGE =====
console.log('\n===== CPU USAGE =====\n');

const startUsage = process.cpuUsage();

// Some work
for (let i = 0; i < 1e7; i++) {
  Math.sqrt(i);
}

const endUsage = process.cpuUsage(startUsage);
console.log('CPU used (microseconds):', endUsage);

// ===== 11. STOPPING PROCESS =====
console.log('\n===== STOPPING PROCESS =====\n');

// Exit after 2 seconds
// setTimeout(() => {
//   console.log('Exiting now');
//   process.exit(0); // 0 = success, 1 = error
// }, 2000);

// ===== 12. SENDING SIGNALS =====
console.log('\n===== SIGNALS =====\n');

process.on('SIGINT', () => {
  console.log('Received SIGINT (Ctrl+C)');
  process.exit(0);
});

process.on('SIGNTERM', () => {
  console.log('Received SIGTERM');
  process.exit(0);
});

// ===== 13. IMMEDIATE VS FUTURE MICROTASK =====
console.log('\n===== COMPLETE EXAMPLE =====\n');

new Promise(resolve => {
  console.log('Promise constructor');
  resolve('resolved');
})
  .then(value => {
    console.log('then 1:', value);
    process.nextTick(() => {
      console.log('nextTick in promise');
    });
  });

process.nextTick(() => {
  console.log('nextTick');
});

setImmediate(() => {
  console.log('setImmediate');
  Promise.resolve().then(() => {
    console.log('Promise in setImmediate');
  });
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

console.log('Synchronous');

// ===== 14. MEMORY LEAK EXAMPLE =====
console.log('\n===== MEMORY LEAK WARNING =====\n');

// Warning: This can cause memory leak
// const leakyArray = [];
// process.on('uncaughtException', () => {
//   leakyArray.push(new Array(1000000)); // Keeps growing forever
// });

console.log('Memory leak: Storing references to large objects indefinitely');

// ===== 15. WHEN TO USE WHAT =====
console.log('\n===== USE CASES =====\n');
console.log('process.nextTick: When you need to defer before I/O operations');
console.log('setImmediate: When you need to defer execution after I/O');
console.log('setTimeout: When you need a specific delay or to defer to next macrotask');
console.log('Promise: Async operations with guaranteed microtask execution');
