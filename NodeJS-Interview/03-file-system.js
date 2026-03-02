// ============================================
// FILE SYSTEM OPERATIONS - INTERVIEW EXAMPLES
// ============================================

const fs = require('fs');
const path = require('path');

// 1. READ FILE - ASYNCHRONOUS
fs.readFile('example.txt', 'utf-8', (error, data) => {
  if (error) {
    console.error('Error reading file:', error);
  } else {
    console.log('File content:', data);
  }
});

// 2. READ FILE - SYNCHRONOUS (BLOCKING)
try {
  const data = fs.readFileSync('example.txt', 'utf-8');
  console.log('File content:', data);
} catch (error) {
  console.error('Error:', error);
}

// 3. READ FILE - PROMISE-BASED
fs.promises.readFile('example.txt', 'utf-8')
  .then(data => console.log('File content:', data))
  .catch(error => console.error('Error:', error));

// 4. READ FILE - ASYNC/AWAIT
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile('example.txt', 'utf-8');
    console.log('File content:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 5. WRITE FILE
fs.writeFile('output.txt', 'Hello, World!', 'utf-8', (error) => {
  if (error) {
    console.error('Error writing file:', error);
  } else {
    console.log('File written successfully');
  }
});

// 6. APPEND TO FILE
fs.appendFile('output.txt', '\nNew line appended', 'utf-8', (error) => {
  if (error) {
    console.error('Error appending file:', error);
  } else {
    console.log('Data appended successfully');
  }
});

// 7. DELETE FILE
fs.unlink('output.txt', (error) => {
  if (error) {
    console.error('Error deleting file:', error);
  } else {
    console.log('File deleted successfully');
  }
});

// 8. CHECK IF FILE EXISTS
// Using fs.existsSync (synchronous)
if (fs.existsSync('example.txt')) {
  console.log('File exists');
} else {
  console.log('File does not exist');
}

// 9. GET FILE STATISTICS
fs.stat('example.txt', (error, stats) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('File stats:', {
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      created: stats.birthtime,
      modified: stats.mtime
    });
  }
});

// 10. READ DIRECTORY
fs.readdir('./', (error, files) => {
  if (error) {
    console.error('Error reading directory:', error);
  } else {
    console.log('Files in directory:', files);
  }
});

// 11. CREATE DIRECTORY
fs.mkdir('new-folder', (error) => {
  if (error) {
    console.error('Error creating directory:', error);
  } else {
    console.log('Directory created successfully');
  }
});

// 12. RECURSIVE MKDIR
fs.mkdir('nested/folder/structure', { recursive: true }, (error) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Directory structure created');
  }
});

// 13. REMOVE DIRECTORY
fs.rmdir('new-folder', (error) => {
  if (error) {
    console.error('Error removing directory:', error);
  } else {
    console.log('Directory removed successfully');
  }
});

// 14. RENAME FILE
fs.rename('old-name.txt', 'new-name.txt', (error) => {
  if (error) {
    console.error('Error renaming file:', error);
  } else {
    console.log('File renamed successfully');
  }
});

// 15. READ FILE IN CHUNKS (STREAMING)
const readable = fs.createReadStream('large-file.txt', {
  encoding: 'utf-8',
  highWaterMark: 16 * 1024 // 16KB chunks
});

readable.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readable.on('end', () => {
  console.log('File reading completed');
});

readable.on('error', (error) => {
  console.error('Error:', error);
});

// 16. WRITE FILE WITH STREAMING
const writable = fs.createWriteStream('output-stream.txt');

writable.write('First line\n');
writable.write('Second line\n');
writable.write('Third line\n');
writable.end();

writable.on('finish', () => {
  console.log('Writing completed');
});

writable.on('error', (error) => {
  console.error('Error:', error);
});

// 17. PIPE (CONNECT STREAMS)
const readable2 = fs.createReadStream('input.txt');
const writable2 = fs.createWriteStream('output.txt');

readable2.pipe(writable2);

// 18. WATCH FOR FILE CHANGES
fs.watch('example.txt', (eventType, filename) => {
  console.log(`File ${filename} has been ${eventType}`);
  // Events: rename, change
});

// 19. WORKING WITH PATHS
console.log('Basename:', path.basename('/user/local/bin/node.exe'));
console.log('Dirname:', path.dirname('/user/local/bin/node.exe'));
console.log('Extension:', path.extname('/user/local/bin/node.exe'));
console.log('Join:', path.join('/user', 'local', 'bin'));
console.log('Resolve:', path.resolve('example.txt')); // Absolute path
console.log('Relative:', path.relative('/user/local', '/user/local/bin'));

// 20. COPY FILE
fs.copyFile('source.txt', 'destination.txt', (error) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('File copied successfully');
  }
});

// 21. PROMISE-BASED FILE OPERATIONS (Modern)
(async () => {
  try {
    await fs.promises.writeFile('promise.txt', 'Hello with promises');
    const content = await fs.promises.readFile('promise.txt', 'utf-8');
    console.log('Content:', content);
  } catch (error) {
    console.error('Error:', error);
  }
})();

// 22. UNDERSTANDING DIFFERENCES
console.log('Difference between sync vs async:');
console.log('- Sync: Blocks execution, simple but can freeze app');
console.log('- Async: Non-blocking, better for performance');
console.log('- Streams: Handle large files efficiently');
