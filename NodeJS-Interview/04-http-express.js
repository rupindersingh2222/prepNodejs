// ============================================
// HTTP SERVER & EXPRESS - INTERVIEW EXAMPLES
// ============================================

// ===== 1. BASIC HTTP SERVER =====
const http = require('http');

const server = http.createServer((request, response) => {
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);

  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<h1>Welcome to Node.js!</h1>');
    response.end();
  } else if (request.url === '/about') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('About page');
    response.end();
  } else if (request.url === '/api/users' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ users: ['John', 'Jane'] }));
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 - Page not found');
    response.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// ===== 2. HANDLING REQUEST BODY =====
const http2 = require('http');

const serverWithBody = http2.createServer((request, response) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    console.log('Request body:', body);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ received: body }));
    response.end();
  });
});

serverWithBody.listen(3001);

// ===== 3. EXPRESS JS BASICS =====
// npm install express
const express = require('express');
const app = express();

// Middleware - Parses JSON
app.use(express.json());

// Middleware - Parses URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware - Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Call next middleware
});

// ===== 4. BASIC ROUTES =====
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get('/users', (req, res) => {
  // Query parameters: /users?page=1&limit=10
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  res.json({ page, limit });
});

// ===== 5. POST REQUEST =====
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const newUser = { id: 1, name, email };
  res.status(201).json(newUser);
});

// ===== 6. PUT REQUEST (UPDATE) =====
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  
  res.json({ id, name, email, message: 'User updated' });
});

// ===== 7. DELETE REQUEST =====
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `User ${id} deleted` });
});

// ===== 8. ERROR HANDLING MIDDLEWARE =====
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ===== 9. CUSTOM MIDDLEWARE =====
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify token logic here
  req.user = { id: 1, name: 'John' };
  next();
}

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// ===== 10. MIDDLEWARE EXECUTION ORDER =====
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.get('/test', (req, res) => {
  console.log('Route handler');
  res.send('Test');
});

// Output order: Middleware 1 -> Middleware 2 -> Route handler

// ===== 11. ROUTING ORGANIZATION =====
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

userRouter.post('/', (req, res) => {
  res.json({ message: 'Create user' });
});

app.use('/api/users', userRouter);

// ===== 12. STATIC FILES =====
// Serve static files from 'public' folder
app.use(express.static('public'));
// Now: http://localhost:3000/styles.css loads from public/styles.css

// ===== 13. SENDING RESPONSES =====
app.get('/send-types', (req, res) => {
  // JSON
  res.json({ key: 'value' });

  // String
  // res.send('text response');

  // HTML
  // res.send('<h1>HTML</h1>');

  // File
  // res.sendFile(__dirname + '/file.txt');

  // Status code
  // res.status(201).json({ message: 'Created' });

  // Redirect
  // res.redirect('/');
});

// ===== 14. QUERY AND PATH PARAMETERS =====
app.get('/posts/:id/comments/:commentId', (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const sort = req.query.sort; // /posts/1/comments/5?sort=asc

  res.json({ postId, commentId, sort });
});

// ===== 15. REQUEST BODY VALIDATION =====
app.post('/validate', (req, res) => {
  const { email, age } = req.body;

  // Simple validation
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email' });
  }

  if (age && (typeof age !== 'number' || age < 0)) {
    return res.status(400).json({ error: 'Invalid age' });
  }

  res.json({ message: 'Validation passed' });
});

// ===== 16. REQUEST HEADERS =====
app.get('/headers', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const contentType = req.headers['content-type'];
  
  res.json({ userAgent, contentType });
});

// ===== 17. CORS MIDDLEWARE =====
// npm install cors
const cors = require('cors');
app.use(cors());

// ===== 18. CONDITIONAL MIDDLEWARE =====
app.get('/admin', (req, res) => {
  // Admin check
  const isAdmin = req.headers['x-admin'] === 'true';

  if (!isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json({ message: 'Admin data' });
});

// ===== 19. CHAINING ROUTES =====
app.route('/posts')
  .get((req, res) => res.json({ message: 'Get posts' }))
  .post((req, res) => res.json({ message: 'Create post' }))
  .put((req, res) => res.json({ message: 'Update post' }))
  .delete((req, res) => res.json({ message: 'Delete post' }));

// ===== 20. 404 HANDLER (MUST BE LAST) =====
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Uncomment to start server
// app.listen(3000, () => {
//   console.log('Express server running on port 3000');
// });

// ===== KEY DIFFERENCES =====
console.log('HTTP vs Express:');
console.log('- HTTP: Low-level, more control, verbose');
console.log('- Express: Framework, easier, built-in features');
console.log('- Express provides: routing, middleware, templating');
