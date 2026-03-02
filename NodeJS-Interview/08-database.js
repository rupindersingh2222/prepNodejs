// ============================================
// DATABASE OPERATIONS - INTERVIEW EXAMPLES
// ============================================

// ===== 1. CONNECTING TO DATABASE =====
console.log('===== DATABASE CONNECTIONS =====\n');

// Example with MongoDB (using Mongoose)
// npm install mongoose

const mongoose = require('mongoose');

// Connection string
const mongoURL = 'mongodb://localhost:27017/myapp';

// Connect
// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB error:', err));

// ===== 2. DEFINING SCHEMA AND MODEL =====
console.log('===== SCHEMA & MODEL =====\n');

// Schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
// const User = mongoose.model('User', userSchema);

// ===== 3. CRUD OPERATIONS =====
console.log('===== CRUD OPERATIONS =====\n');

// CREATE - Insert new document
async function createUser() {
  try {
    // const user = await User.create({
    //   name: 'John Doe',
    //   email: 'john@example.com',
    //   age: 30
    // });
    // console.log('User created:', user);
    console.log('CREATE: Insert new user into database');
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}

// READ - Fetch documents
async function getUsers() {
  try {
    // Find all users
    // const users = await User.find();

    // Find by specific criteria
    // const activeUsers = await User.find({ isActive: true });

    // Find and select specific fields
    // const users = await User.find().select('name email');

    // Find with filtering
    // const users = await User.find({ age: { $gte: 18 } });

    // Find with sorting
    // const users = await User.find().sort({ createdAt: -1 });

    // Find with limit and skip (pagination)
    // const users = await User.find().limit(10).skip(0);

    // Find one document
    // const user = await User.findOne({ email: 'john@example.com' });

    // Find by ID
    // const user = await User.findById('userId');

    console.log('READ: Retrieve users from database');
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
}

// UPDATE - Modify existing document
async function updateUser() {
  try {
    // Update one document
    // const user = await User.findByIdAndUpdate(
    //   'userId',
    //   { name: 'Jane Doe' },
    //   { new: true } // Return updated document
    // );

    // Update multiple documents
    // const result = await User.updateMany(
    //   { isActive: false },
    //   { isActive: true }
    // );

    // Update specific field
    // const user = await User.findByIdAndUpdate(
    //   'userId',
    //   { $set: { age: 31 } },
    //   { new: true }
    // );

    console.log('UPDATE: Modify user information');
  } catch (error) {
    console.error('Error updating user:', error.message);
  }
}

// DELETE - Remove document
async function deleteUser() {
  try {
    // Delete one document
    // const user = await User.findByIdAndDelete('userId');

    // Delete multiple documents
    // const result = await User.deleteMany({ isActive: false });

    console.log('DELETE: Remove user from database');
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
}

// ===== 4. RELATIONSHIPS =====
console.log('\n===== RELATIONSHIPS =====\n');

// One-to-Many relationship example
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to User model
  }
});

// Many-to-Many example
const courseSchema = new mongoose.Schema({
  name: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Populate related data
async function getPostsWithAuthor() {
  try {
    // const posts = await Post.find().populate('author');
    // Now author field contains full user details
    console.log('POPULATE: Fetch related documents');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ===== 5. INDEXING =====
console.log('\n===== INDEXING =====\n');

// Indexes improve query performance
const indexedSchema = new mongoose.Schema({
  email: { type: String, index: true },
  username: { type: String, unique: true },
  createdAt: { type: Date, index: true }
});

console.log('Index types:');
console.log('- Single field index: Speeds up queries on that field');
console.log('- Unique index: Ensures no duplicates');
console.log('- Compound index: Multiple fields');
console.log('- Text index: Full-text search');

// ===== 6. AGGREGATION =====
console.log('\n===== AGGREGATION =====\n');

async function aggregateData() {
  try {
    // const result = await User.aggregate([
    //   { $match: { isActive: true } },           // Filter
    //   { $group: { _id: '$age', count: { $sum: 1 } } },  // Group
    //   { $sort: { count: -1 } }                  // Sort
    // ]);
    console.log('AGGREGATION: Complex data analysis pipeline');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ===== 7. TRANSACTIONS =====
console.log('\n===== TRANSACTIONS =====\n');

async function transferMoney() {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Multiple operations
    // await Account.updateOne({ id: 1 }, { $inc: { balance: -100 } }, { session });
    // await Account.updateOne({ id: 2 }, { $inc: { balance: 100 } }, { session });

    await session.commitTransaction();
    console.log('TRANSACTION: Multiple operations as atomic unit');
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction failed:', error.message);
  } finally {
    session.endSession();
  }
}

// ===== 8. VALIDATION =====
console.log('\n===== VALIDATION =====\n');

const validatedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age cannot be more than 150']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters']
  }
});

console.log('Validation types: required, min, max, match, custom');

// ===== 9. MIDDLEWARE (HOOKS) =====
console.log('\n===== MIDDLEWARE HOOKS =====\n');

// Pre-hook (before saving)
// userSchema.pre('save', function(next) {
//   console.log('Before save...');
//   // Hash password, validate, etc
//   next();
// });

// Post-hook (after saving)
// userSchema.post('save', function(doc, next) {
//   console.log('After save...');
//   next();
// });

console.log('Hooks for: save, remove, updateOne, find, etc');

// ===== 10. QUERYING WITH FILTERS =====
console.log('\n===== QUERY OPERATORS =====\n');

async function advancedQueries() {
  try {
    // Greater than
    // const users = await User.find({ age: { $gt: 18 } });

    // Less than
    // const users = await User.find({ age: { $lt: 65 } });

    // Between
    // const users = await User.find({ age: { $gte: 18, $lte: 65 } });

    // In array
    // const users = await User.find({ status: { $in: ['active', 'pending'] } });

    // Not in array
    // const users = await User.find({ status: { $nin: ['deleted'] } });

    // Exists
    // const users = await User.find({ age: { $exists: true } });

    // Regex pattern
    // const users = await User.find({ email: { $regex: '@gmail.com' } });

    console.log('Query operators: $gt, $lt, $gte, $lte, $in, $nin, $exists, $regex');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ===== 11. PAGINATION =====
console.log('\n===== PAGINATION =====\n');

async function getPagedUsers(pageNumber = 1, pageSize = 10) {
  try {
    // const skip = (pageNumber - 1) * pageSize;
    // const users = await User.find()
    //   .skip(skip)
    //   .limit(pageSize)
    //   .sort({ createdAt: -1 });

    // const total = await User.countDocuments();
    // const totalPages = Math.ceil(total / pageSize);

    console.log('PAGINATION: skip, limit, sort');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ===== 12. BULK OPERATIONS =====
console.log('\n===== BULK OPERATIONS =====\n');

async function bulkInsert() {
  try {
    // const users = [
    //   { name: 'User1', email: 'user1@example.com' },
    //   { name: 'User2', email: 'user2@example.com' },
    //   { name: 'User3', email: 'user3@example.com' }
    // ];

    // const result = await User.insertMany(users);
    console.log('BULK INSERT: Multiple documents at once');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ===== 13. PERFORMANCE OPTIMIZATION =====
console.log('\n===== OPTIMIZATION TIPS =====\n');

console.log('1. Index frequently queried fields');
console.log('2. Use select() to return only needed fields');
console.log('3. Use lean() for read-only queries (faster)');
console.log('4. Implement pagination for large data sets');
console.log('5. Use updateMany for bulk updates');
console.log('6. Avoid N+1 queries with populate()');
console.log('7. Cache frequently accessed data');
console.log('8. Use connection pooling');

// ===== 14. SQL DATABASES (Alternative) =====
console.log('\n===== SQL vs NoSQL =====\n');

console.log('MongoDB (NoSQL):');
console.log('- Document-based');
console.log('- Flexible schema');
console.log('- Horizontal scaling');

console.log('\nSQL (MySQL, PostgreSQL):');
console.log('- Table-based');
console.log('- Rigid schema');
console.log('- ACID transactions');

// Example with SQL (using Sequelize)
// npm install sequelize mysql2

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('database', 'user', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// const User = sequelize.define('User', {
//   name: DataTypes.STRING,
//   email: DataTypes.STRING
// });

// ===== 15. COMMON MISTAKES =====
console.log('\n===== COMMON MISTAKES =====\n');

console.log('1. Not indexing queries');
console.log('2. Returning all fields when not needed');
console.log('3. Not handling connection errors');
console.log('4. N+1 query problem');
console.log('5. Not cleaning up connections');
console.log('6. Storing large objects directly');
console.log('7. Not using transactions for critical operations');
