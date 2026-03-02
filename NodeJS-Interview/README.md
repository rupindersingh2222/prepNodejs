# Node.js Interview Preparation Guide

## 📚 Overview
This comprehensive guide covers **Node.js interview preparation** with practical examples and detailed explanations of fundamental to advanced concepts.

---

## 📁 Files in This Repository

### 0. **00-javascript-basics.js** ⭐ START HERE
JavaScript fundamentals critical for Node.js interviews:
- **Differences between var, let, const** (scope, hoisting, re-declaration)
- **10 Code questions with outputs** to predict and understand
- **15 Node.js-specific Q&A** about how these affect modules, exports, and async code
- **Practical scenarios** (module exports, event loops, middleware)
- **Best practices and common mistakes**

**Why this matters:**
This bridges pure JavaScript with Node.js concepts. Understanding scope is crucial for writing proper Node.js code, especially with async operations and event loops.

**Key Node.js Questions:**
- How does var affect module exports in Node.js?
- Why is the async loop problem critical for Node.js?
- What's the difference between global scope and module scope?
- How do let/const prevent bugs in event-driven code?

---

### 1. **01-core-concepts.js**
Core Node.js fundamentals including:
- Module system (require vs import)
- Global objects (__dirname, __filename)
- Process object and environment variables
- Command-line arguments
- Memory and timing utilities

**Key Topics:**
- Module exports and imports
- Global namespace
- Process metadata
- Performance timing

---

### 2. **02-async-programming.js**
Comprehensive async patterns from callbacks to async/await:
- Callbacks and callback hell
- Promises and promise chaining
- Promise.all(), Promise.race()
- async/await patterns
- Error handling in async code
- Practical retry and timeout mechanisms

**Key Topics:**
- Callback patterns
- Promise lifecycle
- Async/await syntax
- Promise composition

---

### 3. **03-file-system.js**
File operations and stream handling:
- Reading and writing files (sync vs async)
- Promise-based file operations
- File statistics and metadata
- Directory operations
- Streaming for large files
- File watching and monitoring
- Path utilities

**Key Topics:**
- fs module operations
- Streams and chunks
- File permissions
- Path manipulation

---

### 4. **04-http-express.js**
HTTP server basics and Express.js framework:
- Creating HTTP servers
- Request/response handling
- Express routing and middleware
- Request/response methods
- Authentication middleware
- Error handling
- Static file serving
- Route organization

**Key Topics:**
- HTTP methods (GET, POST, PUT, DELETE)
- Middleware execution order
- Request parameters
- Response types

---

### 5. **05-event-loop-process.js**
Event loop mechanics and process object:
- Event loop phases explained
- Microtasks vs macrotasks
- process.nextTick vs setImmediate
- Complex event loop scenarios
- Process events (exit, uncaughtException)
- Memory and CPU usage
- Process signals

**Key Topics:**
- Event loop architecture
- Timing functions
- Process lifecycle
- Performance measurement

---

### 6. **06-npm-packages.js**
npm and package management:
- package.json structure
- Dependencies vs devDependencies
- Semantic versioning rules
- npm commands and scripts
- package-lock.json importance
- Global vs local packages
- Security and auditing

**Key Topics:**
- Version management
- npm workflows
- Dependency management
- Publishing packages

---

### 7. **07-error-handling.js**
Error handling strategies and patterns:
- try/catch blocks
- Error object properties
- Custom error classes
- Promise error handling
- Async/await error handling
- Global error handlers
- Input validation
- Retry mechanisms
- Error logging

**Key Topics:**
- Exception handling
- Error types
- Graceful degradation
- Best practices

---

### 8. **08-database.js**
Database operations (MongoDB focus):
- Connection management
- Schema and model definition
- CRUD operations
- Relationships (one-to-many, many-to-many)
- Indexing and performance
- Aggregation pipelines
- Transactions
- Validation
- Hooks/middleware

**Key Topics:**
- ODM/ORM patterns
- Data modeling
- Query optimization
- Transactions

---

### 9. **09-interview-qa.js**
**90 Comprehensive Interview Q&A** organized by topics:
- **Sections 1-3:** Fundamentals, Async, File System
- **Sections 4-6:** HTTP/Express, NPM, Process
- **Sections 7-10:** Error Handling, Clustering, Security, Advanced

Total: 90 questions with brief, interview-ready answers

---

## 🎯 Quick Study Guide

### Beginner Level (Start Here)
1. **Read 00-javascript-basics.js** (JavaScript fundamentals)
2. Read 01-core-concepts.js (Node.js basics)
3. Study 02-async-programming.js (callbacks to promises)
4. Review 04-http-express.js (basic routing)
5. Check 09-interview-qa.js (Questions 1-20)

### Intermediate Level
1. Study 03-file-system.js (streams section)
2. Read 05-event-loop-process.js completely
3. Master 02-async-programming.js (async/await section)
4. Review 09-interview-qa.js (Questions 21-60)

### Advanced Level
1. Deep dive into 07-error-handling.js
2. Study 08-database.js completely
3. Master 05-event-loop-process.js (complex scenarios)
4. Review 09-interview-qa.js (Questions 61-90)

---

## 🔑 Most Common Interview Questions

### Tier 1 (Almost Always Asked)
- What is Node.js?
- What is the event loop?
- Explain callbacks, Promises, and async/await
- What's the difference between var, let, const?
- How do you handle errors?

### Tier 2 (Very Likely)
- What are Express middlewares?
- How do you create REST APIs?
- Explain npm and package.json
- What is the difference between require and import?
- How do you work with files?

### Tier 3 (Often Asked)
- What is process.nextTick vs setImmediate?
- How do you handle concurrent requests?
- Explain database operations
- What's the difference between sync and async?
- How do you optimize performance?

---

## ✅ Practice Checklist

- [ ] Run each code file to understand output
- [ ] Modify examples to test different scenarios
- [ ] Create small projects using concepts
- [ ] Answer Q&A questions without looking at answers
- [ ] Explain concepts to someone else
- [ ] Debug code when it doesn't work
- [ ] Time yourself answering questions

---

## 🚀 How to Use These Files

### Option 1: Study & Review
1. **Read each file carefully**
2. **Run each file with: `node filename.js`**
3. **Uncomment examples and modify them**
4. **Test predictions before running code**

**Start with:**
```bash
# JavaScript fundamentals first
node 00-javascript-basics.js

# Then Node.js core concepts
node 01-core-concepts.js

# Then async patterns
node 02-async-programming.js
```

### Option 2: Quick Reference
```bash
# Use 09-interview-qa.js as a quick reference
# Read through questions before interviews
# Practice answering each question
```

### Option 3: Project Based
```bash
# Use concepts from files to build projects:
# - Build a simple HTTP server (04-http-express)
# - Create a file watcher (03-file-system)
# - Build REST API with Express (04-http-express + 08-database)
```

---

## 📋 File System Patterns

### Reading Files
From 03-file-system.js:
```javascript
// Async
fs.readFile('file.txt', 'utf-8', callback);

// Promise-based
fs.promises.readFile('file.txt', 'utf-8');

// Sync (don't use in production)
fs.readFileSync('file.txt', 'utf-8');
```

### Handling Async Operations
From 02-async-programming.js:
```javascript
// Callbacks
fn(callback);

// Promises
fn().then().catch();

// Async/await
const result = await fn();
```

### Express Routes
From 04-http-express.js:
```javascript
app.get('/users/:id', middleware, handler);
app.post('/users', validateInput, handler);
app.put('/users/:id', authCheck, handler);
app.delete('/users/:id', handler);
```

---

## 🎓 Learning Outcomes

After completing this guide, you should be able to:

✅ Explain Node.js fundamentals and architecture
✅ Write and debug asynchronous code patterns
✅ Build REST APIs with Express.js
✅ Work with file systems and streams
✅ Manage packages with npm
✅ Handle errors gracefully
✅ Optimize application performance
✅ Answer 90+ interview questions
✅ Build production-ready applications

---

## 📚 Additional Resources

### Official Documentation
- [Node.js Docs](https://nodejs.org/docs/)
- [Express Docs](https://expressjs.com/)
- [npm Docs](https://docs.npmjs.com/)

### Popular Packages
- **http-server**: Basic HTTP knowledge
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **sequelize**: SQL ORM
- **jest**: Testing
- **nodemon**: Development tool

### Interview Tips
1. **Think before answering** - Take a moment to organize thoughts
2. **Provide examples** - Code examples are better than theory
3. **Explain trade-offs** - Show knowledge of when to use what
4. **Ask clarifying questions** - Shows you understand thoroughly
5. **Write clean code** - During live coding exercises
6. **Handle edge cases** - Think about error scenarios

---

## ⚠️ Common Interview Mistakes

❌ Not understanding the event loop
❌ Confusing callbacks with Promises
❌ Forgetting async/await best practices
❌ Weak error handling knowledge
❌ Not knowing npm/package.json well
❌ Can't explain Express middleware
❌ Missing security concepts
❌ Poor performance optimization knowledge

---

## 🎯 Interview Strategy

1. **Preparation Phase** (2-3 weeks before)
   - Study files in order (01 → 09)
   - Build small projects to practice
   - Answer Q&A without looking

2. **Final Week**
   - Review 09-interview-qa.js daily
   - Practice explaining concepts
   - Build one larger project

3. **Before Interview**
   - Get rest, eat well
   - Review your weak areas
   - Have examples ready
   - Stay calm

4. **During Interview**
   - Listen carefully to questions
   - Ask for clarification if needed
   - Think aloud about your approach
   - Write clean, documented code

---

## 📞 Quick Reference

**Files by Topic:**
- JavaScript Basics: 00
- Architecture: 01, 05
- Async: 02, 07
- I/O: 03
- Web: 04
- Modules: 06
- Data: 08
- All Topics: 09

**Running Examples:**
```bash
node 01-core-concepts.js
node 02-async-programming.js
node 03-file-system.js
# ... etc
```

**Study Time Estimate:**
- Quick Review: 2-3 hours
- Thorough Study: 5-7 days
- Mastery: 2-3 weeks with practice

---

## 🚀 Next Steps

1. ✅ Go through each file
2. ✅ Run examples and modify them
3. ✅ Answer 09-interview-qa.js questions
4. ✅ Build a practice project
5. ✅ Prepare answers to common questions
6. ✅ Practice with mock interviews
7. ✅ Explain concepts to peers

---

**Good luck with your Node.js interview preparation! 🎉**

*Last Updated: February 2026*
*Total Content: 10 files, 1200+ lines of code and explanations*
