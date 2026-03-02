// ============================================
// NODE.JS INTERVIEW Q&A - COMPREHENSIVE GUIDE
// ============================================

/*
==================================================
SECTION 1: FUNDAMENTALS
==================================================
*/

`
Q1: What is Node.js?
A: Node.js is a JavaScript runtime built on Chrome's V8 engine that allows
   JavaScript to run on the server-side. It's non-blocking, event-driven,
   and efficient for I/O-heavy applications.

Q2: What is an event loop?
A: The event loop is the core of Node.js asynchronous model. It continuously
   checks for tasks in the event queue and executes them. It has phases:
   - Timers
   - Pending Callbacks
   - Idle, Prepare
   - Poll
   - Check
   - Close Callbacks

Q3: What is the difference between require() and import?
A: require() is CommonJS (synchronous), import is ES6 (can be async).
   - require() can be called anywhere
   - import must be at top of file
   - import is preferred in modern Node.js

Q4: What is non-blocking I/O?
A: Operations don't wait for I/O. Instead, callbacks are executed when
   the operation completes. This allows handling multiple operations
   concurrently without blocking the main thread.

Q5: What is the V8 engine?
A: V8 is Google's JavaScript engine that compiles JavaScript to machine code.
   It provides JIT compilation, garbage collection, and performance
   optimization for JavaScript execution.
`;

/*
==================================================
SECTION 2: ASYNCHRONOUS PROGRAMMING
==================================================
*/

`
Q6: What are callbacks?
A: Functions passed as arguments that are called after an operation completes.
   Pros: Simple, direct control
   Cons: Callback hell, hard to read, error handling is complex

Q7: What are Promises?
A: Objects representing eventual completion or failure of async operation.
   Three states: pending, fulfilled, rejected
   Better error handling with .catch(), chainable with .then()

Q8: What is async/await?
A: Syntactic sugar over Promises that makes async code look synchronous.
   Pros: Cleaner, easier to read, easier to debug
   Cons: Need try/catch for error handling

Q9: Explain the difference between Promise.all() and Promise.race()
A: Promise.all(): Waits for all promises to resolve (or any to reject)
   Promise.race(): Returns result of first settled promise (resolve or reject)

Q10: What is a callback hell and how to avoid it?
A: Callback hell is nested callbacks (pyramid of doom).
   Solutions: Use Promises, async/await, or break into named functions

Q11: How does setTimeout work in Node.js?
A: setTimeout schedules code to run after specified milliseconds.
   It's placed in the timer queue and executed in the Timers phase
   of the event loop.

Q12: What's the difference between setImmediate and setTimeout?
A: setTimeout(callback, 0): Executes in Timers phase
   setImmediate(callback): Executes in Check phase (after Poll)
   Therefore, setImmediate usually runs after setTimeout in same event loop.

Q13: What is process.nextTick()?
A: Executes callback at the end of current operation, before next phase
   of event loop. Microtask, executes before timers.

Q14: How do you handle errors in async/await?
A: Use try/catch blocks:
   ```
   try {
     const data = await somePromise();
   } catch (error) {
     console.error(error);
   }
   ```
`;

/*
==================================================
SECTION 3: FILE SYSTEM
==================================================
*/

`
Q15: What's the difference between fs.readFile and fs.readFileSync?
A: readFile: Non-blocking, asynchronous, better for performance
   readFileSync: Blocking, synchronous, simpler but can freeze app

Q16: What are streams?
A: Streams process data in chunks rather than loading entire file in memory.
   Types: Readable, Writable, Transform
   Benefits: Lower memory usage, better for large files

Q17: What does fs.watch() do?
A: Monitors file/directory for changes (rename, modify) and triggers
   callback with event type and filename.

Q18: What is the difference between fs.stat() and fs.existsSync()?
A: fs.stat(): Returns detailed file information (size, permissions, dates)
   fs.existsSync(): Only checks if file exists (true/false)

Q19: How do you read a large file efficiently?
A: Use streams with createReadStream():
   - Reads in chunks
   - Lower memory usage
   - Doesn't load entire file in memory
`;

/*
==================================================
SECTION 4: HTTP & EXPRESS
==================================================
*/

`
Q20: What is Express.js?
A: Minimal web framework for Node.js that provides:
   - Routing
   - Middleware support
   - Request/Response handling
   - Built-in utilities

Q21: What are middlewares?
A: Functions with access to req, res, next. Execute in order until
   one sends response or calls next(). Used for authentication, logging,
   validation, etc.

Q22: What's the difference between app.get() and app.post()?
A: GET: Retrieve data, idempotent, cacheable, parameters in URL
   POST: Submit data, not idempotent, parameters in body, creates resources

Q23: How do you handle errors in Express?
A: Error handling middleware (placed last):
   ```
   app.use((err, req, res, next) => {
     res.status(err.status || 500).json({ error: err.message });
   });
   ```

Q24: What is routing?
A: Mapping URLs to handler functions:
   app.get('/path', handler)
   Can include parameters: /users/:id
   Can chain routes with app.route()

Q25: What are HTTP status codes?
A: 2xx: Success (200, 201, 204)
   3xx: Redirection (301, 302, 304)
   4xx: Client error (400, 401, 403, 404, 409)
   5xx: Server error (500, 502, 503)

Q26: What is a request body?
A: Data sent in POST/PUT requests, typically JSON or form data.
   Accessed via req.body (with middleware: express.json())

Q27: What are query parameters?
A: Parameters in URL after ?: ?page=1&limit=10
   Accessed via req.query
   Used for filtering, sorting, pagination

Q28: What are path parameters?
A: Part of the URL path: /users/:id
   :id is dynamic
   Accessed via req.params.id

Q29: How do you serve static files in Express?
A: Use app.use(express.static('folder'))
   Files in folder are accessible from root URL

Q30: What is CORS?
A: Cross-Origin Resource Sharing - allows requests from different domains
   Install: npm install cors
   Use: app.use(cors())
`;

/*
==================================================
SECTION 5: NPM & MODULES
==================================================
*/

`
Q31: What is npm?
A: Node Package Manager - package manager for Node.js
   Installs from registry, manages dependencies

Q32: What's the difference between dependencies and devDependencies?
A: dependencies: Needed in production (express, mongoose)
   devDependencies: Only in development (jest, nodemon, eslint)

Q33: What does package-lock.json do?
A: Locks exact versions of dependencies
   Ensures consistent installations across environments
   Improves installation speed

Q34: What are semantic versioning rules?
A: Format: MAJOR.MINOR.PATCH
   ^: Allow minor/patch updates
   ~: Allow only patch updates
   Example: ^1.2.3 allows up to 1.x.x

Q35: What is node_modules?
A: Directory containing all installed packages
   Can be large (100s of MB)
   Should be .gitignored
   Regenerated with: npm install

Q36: How do you install packages?
A: npm install package-name (saves to dependencies)
   npm install --save-dev package-name (saves to devDependencies)
   npm install package-name@1.2.3 (specific version)
   npm install (all packages in package.json)

Q37: What's the difference between npm update and npm install?
A: npm install: Installs exact versions from package-lock.json
   npm update: Updates to latest version respecting ^ and ~

Q38: What are npm scripts?
A: Commands defined in package.json scripts section
   Run with: npm run script-name
   Special: npm start, npm test (no need for 'run')

Q39: What is a private npm package?
A: Packages scoped with @org/name, not public
   Requires authentication to install

Q40: What is npm audit?
A: Checks for security vulnerabilities in dependencies
   npm audit fix: Automatically fixes where possible
`;

/*
==================================================
SECTION 6: PROCESS & GLOBALS
==================================================
*/

`
Q41: What is the global object in Node.js?
A: Similar to window in browsers. Contains:
   - global.console
   - global.setTimeout/setInterval
   - global.process
   - __dirname, __filename

Q42: What is process.env?
A: Object containing environment variables
   Access with: process.env.NODE_ENV
   Set in .env file or command line

Q43: What are process signals?
A: SIGINT (Ctrl+C), SIGTERM, SIGHUP
   Listen with: process.on('SIGINT', handler)

Q44: What is process.exit()?
A: Terminates Node process with exit code
   0: Success
   1+: Error

Q45: What does __dirname contain?
A: Absolute path of current file's directory

Q46: What is process.cwd()?
A: Current working directory (where script is run from)
   Can differ from __dirname

Q47: How do you read command line arguments?
A: process.argv array
   node script.js arg1 arg2
   process.argv = ['node', 'script.js', 'arg1', 'arg2']

Q48: How do you measure performance?
A: console.time('label') and console.timeEnd('label')
   Or: process.hrtime() for high-resolution time

Q49: How do you check memory usage?
A: process.memoryUsage() returns:
   rss, heapTotal, heapUsed, external, arrayBuffers

Q50: What is garbage collection?
A: Automatic memory management - unused objects are freed
   V8 engine handles this, but can cause brief pauses
`;

/*
==================================================
SECTION 7: ERROR HANDLING
==================================================
*/

`
Q51: How do you handle errors in Node.js?
A: try/catch for sync code
   .catch() for Promises
   try/catch for async/await
   Error middleware in Express
   Global process handlers

Q52: What is an uncaught exception handler?
A: process.on('uncaughtException', handler)
   Catches errors not handled by try/catch
   Should exit process after logging

Q53: What is an unhandled rejection handler?
A: process.on('unhandledRejection', handler)
   Catches Promises rejected without .catch()

Q54: How do you create custom errors?
A: Extend Error class:
   ```
   class ValidationError extends Error {
     constructor(message) {
       super(message);
       this.name = 'ValidationError';
     }
   }
   ```

Q55: What should an error object contain?
A: - message: Description of error
   - name: Error type
   - stack: Call stack for debugging
   - code/statusCode: Error classification

Q56: How do you handle errors in callbacks?
A: Error-first callback pattern:
   function(error, data) {
     if (error) { handle error }
     else { use data }
   }

Q57: What is error-first callback convention?
A: First parameter is error, second is data
   if (error) handle it, else process data
   Standard in Node.js

Q58: How do you validate input?
A: Check before processing:
   - Required fields
   - Type validation
   - Range/format validation
   - Throw error if invalid

Q59: What is graceful error handling?
A: Don't crash, provide sensible fallback:
   Try to fetch data, if fails return defaults
   Try API call, if fails use cache

Q60: How do you log errors?
A: Include timestamp, error type, message, stack, context
   Use logging libraries: winston, pino
   Avoid logging sensitive data
`;

/*
==================================================
SECTION 8: CLUSTERING & PERFORMANCE
==================================================
*/

`
Q61: What is clustering?
A: Running multiple Node processes for concurrency
   Each process gets one CPU core
   Cluster module manages this
   Load balancing across workers

Q62: Why use clustering?
A: Node is single-threaded
   Clustering uses all CPU cores
   Improved performance on multi-core systems
   Fault tolerance (restart dead workers)

Q63: What is middleware ordering important?
A: Middlewares execute in registration order
   First matching route wins
   Error middleware must be last

Q64: How do you optimize Node performance?
A: - Use clustering
   - Implement caching
   - Use streams for large data
   - Index database queries
   - Minimize dependencies
   - Use CDN for static files
   - Implement pagination

Q65: What is a memory leak?
A: Unreferenced objects not freed by garbage collection
   Causes: Circular references, forgotten timers, listeners
   Solution: Clean up resources, remove listeners

Q66: How do you debug Node.js?
A: - console.log (basic)
   - Node debugger: node inspect script.js
   - Chrome DevTools: --inspect flag
   - Debuggers: VS Code, WebStorm
   - Logging libraries

Q67: What is profiling?
A: Analyzing code performance:
   - CPU profiling
   - Memory profiling
   - Flame graphs
   Tools: clinic.js, node-inspector

Q68: How do you handle memory efficiently?
A: - Avoid global variables
   - Delete unused references
   - Use streams for large files
   - Implement pagination
   - Monitor with process.memoryUsage()

Q69: What is a race condition?
A: Multiple async operations accessing same resource
   Results depend on timing
   Solution: Use locks, transactions, or sequencing

Q70: What is concurrency vs parallelism?
A: Concurrency: Multiple tasks interleaved
   Parallelism: Multiple tasks running simultaneously
   Node handles concurrency, not true parallelism (single-threaded)
`;

/*
==================================================
SECTION 9: SECURITY
==================================================
*/

`
Q71: What are common Node.js security issues?
A: - SQL injection
   - NoSQL injection
   - XSS attacks
   - CSRF attacks
   - Weak authentication
   - Missing input validation

Q72: How do you prevent SQL injection?
A: Use parameterized queries
   Validate input
   Use ORMs (Sequelize, Knex)

Q73: How do you secure APIs?
A: - Use HTTPS
   - Implement authentication (JWT, OAuth)
   - Rate limiting
   - Input validation
   - CORS configuration
   - Helmet.js middleware

Q74: What is helmet.js?
A: Security middleware for Express
   Sets HTTP security headers
   npm install helmet
   app.use(helmet())

Q75: What is rate limiting?
A: Restricts requests from single IP
   Prevents DDoS, brute force
   Use: express-rate-limit package

Q76: How do you store passwords?
A: NEVER store plain text
   Hash with bcrypt: npm install bcrypt
   Or use argon2
   Always use salt

Q77: What is HTTPS?
A: Encrypted HTTP protocol
   Uses certificates
   Prevents man-in-the-middle attacks
   Required for sensitive data

Q78: What is JWT?
A: JSON Web Token for authentication
   Contains: header.payload.signature
   Stateless, scalable
   Include in Authorization header

Q79: What is CORS?
A: Cross-Origin Resource Sharing
   Protects against unauthorized cross-domain requests
   Configure allowed origins

Q80: How do you validate user input?
A: - Check required fields
   - Type validation
   - Length/format validation
   - Sanitize HTML/scripts
   - Use validation libraries: joi, yup
`;

/*
==================================================
SECTION 10: ADVANCED TOPICS
==================================================
*/

`
Q81: What are worker threads?
A: True multi-threading for CPU-intensive tasks
   Separate V8 instances
   Share memory with shared buffers
   Use: worker_threads module

Q82: What is a microservice architecture?
A: Architecture with small, independent services
   Each service has own database
   Communicate via APIs
   Benefits: Scalability, flexibility, resilience

Q83: What is Docker and why use it?
A: Containerization platform
   Ensures consistent environment
   Easy deployment
   Dependency isolation

Q84: What is the difference between monolithic and microservices?
A: Monolithic: Single large application
   Microservices: Multiple small services
   Microservices: More scalable, complex, resilient

Q85: What is CI/CD?
A: Continuous Integration/Deployment
   Automated testing and deployment
   Tools: Jenkins, GitHub Actions, GitLab CI
   Benefits: Faster releases, fewer bugs

Q86: What is TypeScript?
A: Superset of JavaScript with type safety
   npm install typescript
   Compile to JavaScript
   Better IDE support, fewer bugs

Q87: What is middleware pattern?
A: Chain of responsibility pattern
   Functions process request sequentially
   Each can modify request/response or call next

Q88: What are web sockets?
A: Two-way communication protocol
   Real-time data push
   Package: socket.io, ws
   Better than polling

Q89: What is caching?
A: Store frequently accessed data
   Types: Memory (redis), HTTP caching
   Benefits: Faster response, reduced server load

Q90: What is message queuing?
A: Async communication between services
   Tools: RabbitMQ, Kafka, AWS SQS
   Benefits: Decoupling, reliability, scalability

These 90 questions cover the essential Node.js interview topics.
Practice implementing each concept to deepen understanding.
`;

console.log('NODE.JS INTERVIEW GUIDE - Complete Q&A Ready for Study!');
console.log('Total Questions: 90');
console.log('Sections: Fundamentals, Async, File System, HTTP, NPM,');
console.log('          Process, Error Handling, Clustering, Security, Advanced');
