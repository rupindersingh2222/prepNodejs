// ============================================
// ERROR HANDLING & BEST PRACTICES
// ============================================

// ===== 1. TRY/CATCH FOR SYNCHRONOUS CODE =====
console.log('===== TRY/CATCH =====\n');

try {
  const obj = JSON.parse('invalid json');
  console.log(obj);
} catch (error) {
  console.error('Error caught:', error.message);
  console.error('Error type:', error.constructor.name);
} finally {
  console.log('Cleanup code here');
}

// ===== 2. ERROR OBJECT PROPERTIES =====
console.log('\n===== ERROR PROPERTIES =====\n');

try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log('name:', error.name);           // 'Error'
  console.log('message:', error.message);     // 'Something went wrong'
  console.log('stack:', error.stack);         // Full stack trace
}

// ===== 3. CUSTOM ERRORS =====
console.log('\n===== CUSTOM ERRORS =====\n');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

try {
  throw new ValidationError('Invalid email format');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.message);
  } else {
    console.log('Unknown error:', error.message);
  }
}

// ===== 4. ASYNC/AWAIT ERROR HANDLING =====
console.log('\n===== ASYNC/AWAIT ERRORS =====\n');

async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Failed to fetch data'));
    }, 1000);
  });
}

// Using try/catch
async function fetchWithErrorHandling() {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error('Caught error:', error.message);
    return null;
  }
}

// ===== 5. PROMISE ERROR HANDLING =====
console.log('\n===== PROMISE ERROR HANDLING =====\n');

Promise.resolve()
  .then(() => {
    throw new Error('Error in promise chain');
  })
  .catch(error => {
    console.error('Caught in .catch():', error.message);
  });

// ===== 6. UNHANDLED PROMISE REJECTION =====
console.log('\n===== UNHANDLED REJECTION =====\n');

// Listen for unhandled rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise);
  console.error('Reason:', reason);
});

// This will trigger the above handler
// Promise.reject(new Error('Not handled'));

// ===== 7. UNCAUGHT EXCEPTIONS =====
console.log('\n===== UNCAUGHT EXCEPTIONS =====\n');

// Listen for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message);
  console.error('Stack:', error.stack);
  // Should exit process after logging
  process.exit(1);
});

// ===== 8. THROWING CUSTOM ERRORS =====
console.log('\n===== THROWING ERRORS =====\n');

function validateUser(user) {
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
  if (user.age < 0 || user.age > 150) {
    throw new ValidationError('Age must be between 0 and 150');
  }
  return true;
}

try {
  validateUser({ email: '', age: 30 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation error:', error.message);
  }
}

// ===== 9. ERROR IN CALLBACKS =====
console.log('\n===== ERROR IN CALLBACKS =====\n');

function readFileWithCallback(callback) {
  const fs = require('fs');
  fs.readFile('nonexistent.txt', (error, data) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
}

// Usage (error-first callback pattern)
readFileWithCallback((error, data) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success:', data);
  }
});

// ===== 10. GRACEFUL DEGRADATION =====
console.log('\n===== GRACEFUL DEGRADATION =====\n');

async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch user, using defaults:', error.message);
    return { id: userId, name: 'Unknown User' };
  }
}

// ===== 11. VALIDATION BEFORE PROCESSING =====
console.log('\n===== INPUT VALIDATION =====\n');

function processData(data) {
  // Validate input
  if (!data) {
    throw new Error('Data is required');
  }
  if (typeof data !== 'object') {
    throw new Error('Data must be an object');
  }
  if (!data.id || !data.name) {
    throw new Error('Data must have id and name');
  }

  // Process data
  return { processed: true, data };
}

try {
  processData({ id: 1, name: 'John' });
} catch (error) {
  console.error('Validation error:', error.message);
}

// ===== 12. ERROR CODES AND STATUSES =====
console.log('\n===== ERROR CODES =====\n');

const ErrorCodes = {
  VALIDATION_ERROR: 'E001',
  NOT_FOUND: 'E002',
  UNAUTHORIZED: 'E003',
  SERVER_ERROR: 'E004',
  TIMEOUT: 'E005'
};

class ApplicationError extends Error {
  constructor(message, code, statusCode) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

try {
  throw new ApplicationError(
    'User not found',
    ErrorCodes.NOT_FOUND,
    404
  );
} catch (error) {
  console.log('Error code:', error.code);
  console.log('Status code:', error.statusCode);
}

// ===== 13. LOGGING ERRORS =====
console.log('\n===== ERROR LOGGING =====\n');

function logError(error, context = {}) {
  console.error({
    timestamp: new Date().toISOString(),
    name: error.name,
    message: error.message,
    stack: error.stack,
    context
  });
}

try {
  throw new Error('Sample error');
} catch (error) {
  logError(error, { userId: 123, action: 'fetchData' });
}

// ===== 14. RETRY MECHANISM =====
console.log('\n===== RETRY LOGIC =====\n');

async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Attempt ${i + 1}/${maxRetries}`);
      // const response = await fetch(url);
      // return response;
      return 'Success'; // Dummy return
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i + 1} failed:`, error.message);

      if (i < maxRetries - 1) {
        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, i) * 1000;
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

// ===== 15. CIRCULAR REFERENCE IN ERROR =====
console.log('\n===== CIRCULAR REFERENCE =====\n');

// Custom JSON serialization for errors with circular refs
function errorToJSON(error) {
  const errorObj = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    ...(error.code && { code: error.code }),
    ...(error.statusCode && { statusCode: error.statusCode })
  };
  return errorObj;
}

const err = new Error('Sample');
console.log('Error as JSON:', JSON.stringify(errorToJSON(err)));

// ===== 16. BEST PRACTICES =====
console.log('\n===== BEST PRACTICES =====\n');

console.log('1. Always use try/catch for async/await');
console.log('2. Handle errors at boundaries (API calls, etc)');
console.log('3. Use specific error types, not generic Error');
console.log('4. Log errors with context for debugging');
console.log('5. Implement retry logic for external services');
console.log('6. Use error codes for consistency');
console.log('7. Handle unhandled rejections globally');
console.log('8. Validate input before processing');
console.log('9. Provide meaningful error messages');
console.log('10. Clean up resources in finally block');

// ===== 17. STATUS CODES GUIDE =====
console.log('\n===== HTTP STATUS CODES =====\n');

const statusCodes = {
  200: 'OK - Success',
  201: 'Created - Resource created',
  204: 'No Content - Success, no body',
  400: 'Bad Request - Invalid input',
  401: 'Unauthorized - Authentication required',
  403: 'Forbidden - Access denied',
  404: 'Not Found - Resource not found',
  409: 'Conflict - Resource already exists',
  500: 'Internal Server Error',
  502: 'Bad Gateway - Service unavailable',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

console.log(statusCodes);

// ===== 18. MULTIPLE CATCH BLOCKS =====
console.log('\n===== MULTIPLE ERROR TYPES =====\n');

try {
  throw new ValidationError('Invalid input');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation error handled');
  } else if (error instanceof DatabaseError) {
    console.log('Database error handled');
  } else {
    console.log('Unknown error');
  }
}

// ===== 19. FINALLY BLOCK EXECUTION =====
console.log('\n===== FINALLY BLOCK =====\n');

function finallyExample() {
  try {
    return 'From try';
  } catch (error) {
    return 'From catch';
  } finally {
    console.log('Finally runs regardless of return/throw');
  }
}

finallyExample();

// ===== 20. ERROR MIDDLEWARE IN EXPRESS =====
console.log('\n===== EXPRESS ERROR MIDDLEWARE =====\n');

// const express = require('express');
// const app = express();

// Route that throws error
// app.get('/error', (req, res, next) => {
//   next(new Error('Something went wrong'));
// });

// Error handling middleware (must be last)
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.statusCode || 500).json({
//     error: {
//       message: err.message,
//       code: err.code
//     }
//   });
// });

console.log('Express error middleware pattern implemented');
