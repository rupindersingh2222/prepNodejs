// ============================================
// NODE.JS CORE CONCEPTS - INTERVIEW EXAMPLES
// ============================================

// 1. REQUIRE VS IMPORT
// CommonJS (Node.js default)
const fs = require('fs');
const path = require('path');

// ES6 Modules (if using .mjs or "type": "module" in package.json)
// import fs from 'fs';
// import path from 'path';

// 2. MODULE EXPORTS
module.exports = {
  greeting: function(name) {
    return `Hello, ${name}!`;
  },
  add: (a, b) => a + b
};

// 3. GLOBAL OBJECTS IN NODE.JS
console.log('Global object:', typeof global);
console.log('__dirname:', __dirname);         // Current directory
console.log('__filename:', __filename);       // Current file
console.log('process.version:', process.version);
console.log('process.pid:', process.pid);     // Process ID

// 4. WORKING WITH MODULES
const calculator = require('./calculator'); // If it exists

// 5. PROCESS OBJECT
process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// 6. ENVIRONMENT VARIABLES
process.env.NODE_ENV = 'development';
console.log('Environment:', process.env.NODE_ENV);

// 7. ARGUMENTS PASSED TO SCRIPT
console.log('Command line args:', process.argv);
// Run with: node file.js arg1 arg2
// Output: ['node', 'path/to/file.js', 'arg1', 'arg2']

// 8. CURRENT WORKING DIRECTORY
console.log('Current directory:', process.cwd());

// 9. MEMORYUSAGE
const memUsage = process.memoryUsage();
console.log('Memory Usage:', {
  heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
  heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB'
});

// 10. TIMING CODE EXECUTION
console.time('operation');
// ... some code ...
console.timeEnd('operation');
