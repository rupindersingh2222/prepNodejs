// ============================================
// NPM & PACKAGE MANAGEMENT - INTERVIEW EXAMPLES
// ============================================

// ===== package.json STRUCTURE =====
/*
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A sample Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  },
  "keywords": ["nodejs", "example"],
  "author": "John Doe",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "~6.5.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
*/

// ===== 1. DEPENDENCY vs DEVDEPENDENCY =====
console.log('===== TYPES OF DEPENDENCIES =====\n');

// Dependencies - Required to run the app
// Example: express, axios, mongoose, lodash
console.log('Dependencies: Installed in production');
console.log('Examples: express, db libraries, utilities');

// DevDependencies - Only needed during development
// Example: nodemon, jest, eslint
console.log('\nDevDependencies: NOT installed in production');
console.log('Examples: test runners, linters, build tools');

// Command to install:
// npm install express --save          (adds to dependencies)
// npm install nodemon --save-dev      (adds to devDependencies)

// ===== 2. VERSIONING RULES =====
console.log('\n===== VERSIONING RULES =====\n');

console.log('Exact version: "1.2.3"            -> Exactly 1.2.3');
console.log('Caret (^): "^1.2.3"              -> >=1.2.3 <2.0.0 (minor/patch updates)');
console.log('Tilde (~): "~1.2.3"              -> >=1.2.3 <1.3.0 (patch updates only)');
console.log('Greater than: ">1.2.3"           -> Any version > 1.2.3');
console.log('Greater or equal: ">=1.2.3"      -> Any version >= 1.2.3');
console.log('Asterisk (*): "1.2.*"            -> Latest in 1.2.x range');
console.log('Latest: "latest"                 -> Latest available version');

// Examples:
const versions = {
  exact: "4.18.2",
  caret: "^4.18.2",     // Allows 4.x.x
  tilde: "~4.18.2",     // Allows 4.18.x
  range: ">=4.0.0 <5.0.0"
};

// ===== 3. package-lock.json =====
console.log('\n===== package-lock.json =====\n');

console.log('Purpose: Locks exact versions of all dependencies');
console.log('Benefits:');
console.log('- Consistent installations across environments');
console.log('- Prevents "works on my machine" issues');
console.log('- Speeds up npm install (uses cached deps)');
console.log('- Security: Prevents malicious version updates');

console.log('\nCreated: Automatically when running npm install');
console.log('Should be: Committed to version control (git)');

// ===== 4. NPM SCRIPTS =====
console.log('\n===== NPM SCRIPTS =====\n');

console.log('Run script: npm run <script-name>');
console.log('Run with start: npm start (no need for "run")');
console.log('Run with test: npm test (no need for "run")');

console.log('\nCommon scripts:');
console.log('- npm start: Start production app');
console.log('- npm run dev: Start development server');
console.log('- npm test: Run tests');
console.log('- npm run build: Build for production');
console.log('- npm run lint: Check code style');

/*
Example package.json scripts:
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --coverage",
    "build": "webpack --mode production",
    "lint": "eslint .",
    "format": "prettier --write .",
    "deploy": "npm run build && npm run test && node deploy.js"
  }
}
*/

// ===== 5. GLOBAL PACKAGES =====
console.log('\n===== GLOBAL vs LOCAL PACKAGES =====\n');

console.log('Local package: npm install express');
console.log('  - Installed in ./node_modules');
console.log('  - Used by: require("express")');
console.log('  - Per project');

console.log('\nGlobal package: npm install -g nodemon');
console.log('  - Installed globally (system-wide)');
console.log('  - Used from terminal: nodemon');
console.log('  - Available everywhere');

console.log('\nCommon global packages:');
console.log('- nodemon: Auto-restart during development');
console.log('- create-react-app: Generate React projects');
console.log('- typescript: TypeScript compiler');
console.log('- @angular/cli: Angular CLI');

// ===== 6. SEMANTIC VERSIONING (SEMVER) =====
console.log('\n===== SEMANTIC VERSIONING =====\n');

const semver = {
  MAJOR: '2.0.0',  // Breaking changes
  MINOR: '1.3.0',  // New features (backwards compatible)
  PATCH: '1.2.5'   // Bug fixes
};

console.log('Format: MAJOR.MINOR.PATCH');
console.log('Example: 1.2.3');
console.log('- MAJOR (1): Breaking changes');
console.log('- MINOR (.2): New features (backwards compatible)');
console.log('- PATCH (.3): Bug fixes');

console.log('\nVersion bump examples:');
console.log('1.0.0 -> 1.0.1: Bug fix');
console.log('1.0.1 -> 1.1.0: New feature');
console.log('1.1.0 -> 2.0.0: Breaking change');

// ===== 7. NPM COMMANDS =====
console.log('\n===== NPM COMMANDS =====\n');

console.log('Install dependencies: npm install (or npm i)');
console.log('Install specific package: npm install express');
console.log('Install dev dependency: npm install --save-dev jest');
console.log('Install specific version: npm install express@4.17.1');
console.log('Update packages: npm update');
console.log('Check outdated: npm outdated');
console.log('List installed: npm list');
console.log('Remove package: npm uninstall express');
console.log('Clear cache: npm cache clean --force');
console.log('Check for vulnerabilities: npm audit');

// ===== 8. PEER DEPENDENCIES =====
console.log('\n===== PEER DEPENDENCIES =====\n');

console.log('Used for plugins/optional dependencies');
console.log('Example: React components need React as peer dependency');
console.log('Install: npm install --save-peer react');

/*
In package.json:
{
  "peerDependencies": {
    "react": "^16.0 || ^17.0 || ^18.0"
  }
}
*/

// ===== 9. node_modules FOLDER =====
console.log('\n===== node_modules FOLDER =====\n');

console.log('What: Directory containing all installed packages');
console.log('Size: Can be very large (hundreds of MB)');
console.log('Should be: .gitignored (not committed to git)');
console.log('Recreation: npm install (uses package-lock.json)');
console.log('Reinstall clean: rm -rf node_modules && npm install');

// ===== 10. .npmrc FILE =====
console.log('\n===== .npmrc Configuration =====\n');

console.log('NPM configuration file');
console.log('Common settings:');
console.log('- registry: Where to download packages');
console.log('- proxy: Network proxy settings');
console.log('- timeout: Install timeout');

// .npmrc example:
/*
registry=https://registry.npmjs.org/
timeout=60000
save-prefix=~
*/

// ===== 11. PRIVATE PACKAGES =====
console.log('\n===== PRIVATE PACKAGES =====\n');

console.log('Available only to you or your organization');
console.log('Prefix: @scope/package-name');
console.log('Example: @mycompany/internal-lib');
console.log('Requires: Authentication (npm login)');
console.log('Setup: .npmrc with auth token');

// ===== 12. COMMON ERRORS =====
console.log('\n===== COMMON ERRORS =====\n');

console.log('ENOENT: File not found (missing package.json)');
console.log('npm ERR! 404: Package not found in registry');
console.log('npm ERR! ERESOLVE: Unable to resolve dependencies');
console.log('npm WARN: Peer dependencies not satisfied');

// ===== 13. SHRINKWRAP =====
console.log('\n===== SHRINKWRAP =====\n');

console.log('npm shrinkwrap: Creates npm-shrinkwrap.json');
console.log('Used for production deployments');
console.log('Ensures exact versions in production');

// ===== 14. NPM WORKSPACES =====
console.log('\n===== WORKSPACES =====\n');

console.log('Manage multiple packages in one repo');
console.log('Usage: npm install (installs all workspaces)');

/*
package.json:
{
  "workspaces": [
    "packages/*"
  ]
}

Structure:
root/
  packages/
    package-a/
      package.json
    package-b/
      package.json
  package.json
*/

// ===== 15. MIP VS PNPM VS YARN =====
console.log('\n===== PACKAGE MANAGERS =====\n');

console.log('npm: Default Node.js package manager');
console.log('yarn: Facebook package manager, faster caching');
console.log('pnpm: Fast, efficient disk space usage');
console.log('bun: Modern, very fast (relatively new)');

console.log('\nDifferences:');
console.log('- Lock file format');
console.log('- Installation speed');
console.log('- Disk space efficiency');
console.log('- Feature set');
