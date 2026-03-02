// ============================================
// JAVASCRIPT FUNDAMENTALS FOR NODE.JS INTERVIEW
// var, let, const, Scope, Hoisting
// ============================================

/*
==================================================
SECTION 1: DIFFERENCES BETWEEN var, let, const
==================================================
*/

`
╔════════════════════════════════════════════════════════════════════════════╗
║         COMPARISON: var vs let vs const                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Aspect            │ var          │ let          │ const                  ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Scope             │ Function     │ Block        │ Block                  ║
║ Hoisting          │ Hoisted      │ TDZ*         │ TDZ*                   ║
║ Re-declaration    │ Allowed      │ NOT allowed  │ NOT allowed            ║
║ Re-assignment     │ Allowed      │ Allowed      │ NOT allowed            ║
║ Initialization    │ Optional     │ Optional     │ Required               ║
║ When to use       │ Avoid        │ Most vars    │ When won't change      ║
╚════════════════════════════════════════════════════════════════════════════╝

* TDZ = Temporal Dead Zone (exists but uninitialized from start of block)
`;

console.log('='.repeat(80));
console.log('SECTION 1: var vs let vs const');
console.log('='.repeat(80));

// ===== 1. SCOPE DIFFERENCES =====
console.log('\n--- 1. SCOPE DIFFERENCES ---\n');

// var - Function scoped
function testVarScope() {
  if (true) {
    var x = 'inside block';
  }
  console.log('var x:', x); // Accessible (function scoped)
}
testVarScope();

// let - Block scoped
function testLetScope() {
  if (true) {
    let y = 'inside block';
  }
  try {
    console.log('let y:', y); // Error: y is not defined
  } catch (error) {
    console.log('let error:', error.message);
  }
}
testLetScope();

// const - Block scoped
function testConstScope() {
  if (true) {
    const z = 'inside block';
  }
  try {
    console.log('const z:', z); // Error: z is not defined
  } catch (error) {
    console.log('const error:', error.message);
  }
}
testConstScope();

// ===== 2. RE-DECLARATION =====
console.log('\n--- 2. RE-DECLARATION ---\n');

// var - Can be re-declared
var a = 1;
var a = 2; // Allowed!
console.log('var re-declared:', a); // Output: 2

// let - Cannot be re-declared
let b = 1;
try {
  let b = 2; // Error!
} catch (error) {
  console.log('let re-declare error:', error.message);
}

// const - Cannot be re-declared
const c = 1;
try {
  const c = 2; // Error!
} catch (error) {
  console.log('const re-declare error:', error.message);
}

// ===== 3. RE-ASSIGNMENT =====
console.log('\n--- 3. RE-ASSIGNMENT ---\n');

// var - Can be reassigned
var var1 = 'initial';
var1 = 'reassigned';
console.log('var reassignment:', var1); // Output: reassigned

// let - Can be reassigned
let let1 = 'initial';
let1 = 'reassigned';
console.log('let reassignment:', let1); // Output: reassigned

// const - Cannot be reassigned
const const1 = 'initial';
try {
  const1 = 'reassigned'; // Error!
} catch (error) {
  console.log('const reassignment error:', error.message);
}

// ===== 4. CONST WITH OBJECTS =====
console.log('\n--- 4. CONST WITH OBJECTS (Important!) ---\n');

const obj = { name: 'John', age: 30 };
console.log('const object before:', obj);

// Can modify properties (const doesn't freeze object)
obj.name = 'Jane';
obj.age = 31;
console.log('const object after property change:', obj); // Works!

// Cannot reassign the reference
try {
  obj = { name: 'Bob' }; // Error!
} catch (error) {
  console.log('const object reassignment error:', error.message);
}

// To freeze an object
const frozenObj = Object.freeze({ name: 'John' });
try {
  frozenObj.name = 'Jane'; // Fails silently or error in strict mode
  console.log('Frozen object:', frozenObj); // Still 'John'
} catch (error) {
  console.log('Frozen object error:', error.message);
}

// ===== 5. HOISTING =====
console.log('\n--- 5. HOISTING ---\n');

// var hoisting
console.log('Hoisted var before declaration:', hoistedVar); // undefined (hoisted but uninitialized)
var hoistedVar = 'assigned';
console.log('Hoisted var after declaration:', hoistedVar); // assigned

// let hoisting (Temporal Dead Zone)
console.log('--- let in TDZ ---');
try {
  console.log('Hoisted let before declaration:', hoistedLet); // Error!
  let hoistedLet = 'assigned';
} catch (error) {
  console.log('let TDZ error:', error.message);
}

/*
==================================================
SECTION 2: CODE QUESTIONS WITH OUTPUTS
==================================================
*/

console.log('\n' + '='.repeat(80));
console.log('SECTION 2: CODE QUESTIONS - PREDICT OUTPUT');
console.log('='.repeat(80));

// ===== QUESTION 1 =====
console.log('\n--- QUESTION 1 ---');
console.log('Predict output:');
console.log(`
function test() {
  console.log(x);
  var x = 5;
  console.log(x);
}
test();
`);
console.log('ANSWER: undefined, then 5');

function test1() {
  console.log('Q1 - First:', x1); // undefined (hoisted)
  var x1 = 5;
  console.log('Q1 - Second:', x1); // 5
}
test1();

// ===== QUESTION 2 =====
console.log('\n--- QUESTION 2 ---');
console.log('Predict output:');
console.log(`
function test() {
  console.log(y);
  let y = 10;
}
test();
`);
console.log('ANSWER: ReferenceError: Cannot access y before initialization');

function test2() {
  try {
    console.log('Q2:', y2); // TDZ Error
    let y2 = 10;
  } catch (error) {
    console.log('Q2 - Error:', error.message);
  }
}
test2();

// ===== QUESTION 3 =====
console.log('\n--- QUESTION 3 ---');
console.log('Predict output:');
console.log(`
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
`);
console.log('ANSWER: 3, 3, 3 (i is function scoped)');

console.log('Q3 - With var:');
for (var i3 = 0; i3 < 3; i3++) {
  (function(index) {
    setTimeout(() => console.log('  i =', index), 100);
  })(i3);
}

// ===== QUESTION 4 =====
console.log('\n--- QUESTION 4 ---');
console.log('Predict output:');
console.log(`
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
`);
console.log('ANSWER: 0, 1, 2 (i is block scoped)');

console.log('Q4 - With let:');
for (let i4 = 0; i4 < 3; i4++) {
  setTimeout(() => console.log('  i =', i4), 100);
}

// ===== QUESTION 5 =====
console.log('\n--- QUESTION 5 ---');
console.log('Predict output:');
console.log(`
var a = 1;
let b = 2;
const c = 3;

console.log(window.a);
console.log(window.b);
console.log(window.c);
`);
console.log('ANSWER (Browser): 1, undefined, undefined');
console.log('ANSWER (Node.js): undefined, undefined, undefined');
console.log('Node.js Note: Global in Node is not same as browser window');

// ===== QUESTION 6 =====
console.log('\n--- QUESTION 6 ---');
console.log('Predict output:');
console.log(`
const obj = { value: 10 };
obj.value = 20;
console.log(obj.value);
`);
console.log('ANSWER: 20 (const doesn\'t freeze object properties)');

const q6Obj = { value: 10 };
q6Obj.value = 20;
console.log('Q6 - Output:', q6Obj.value);

// ===== QUESTION 7 =====
console.log('\n--- QUESTION 7 ---');
console.log('Predict output:');
console.log(`
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
`);
console.log('ANSWER: [1, 2, 3, 4] (const doesn\'t prevent mutations)');

const q7Arr = [1, 2, 3];
q7Arr.push(4);
console.log('Q7 - Output:', q7Arr);

// ===== QUESTION 8 =====
console.log('\n--- QUESTION 8 ---');
console.log('Predict output:');
console.log(`
{
  var x = 1;
  let y = 2;
  const z = 3;
}
console.log(typeof x);
console.log(typeof y);
console.log(typeof z);
`);
console.log('ANSWER: number (defined), undefined (not defined), undefined (not defined)');

{
  var q8X = 1;
  let q8Y = 2;
  const q8Z = 3;
}
console.log('Q8 - var:', typeof q8X); // number
try {
  console.log('Q8 - let:', typeof q8Y); // undefined
} catch (e) {
  console.log('Q8 - let: not accessible');
}

// ===== QUESTION 9 =====
console.log('\n--- QUESTION 9 ---');
console.log('Predict output:');
console.log(`
var x = 5;
var x = 10;
console.log(x);

let y = 5;
let y = 10; // Error?
`);
console.log('ANSWER: 10, then SyntaxError');

var q9X = 5;
var q9X = 10;
console.log('Q9 - var duplicated:', q9X); // 10

// ===== QUESTION 10 =====
console.log('\n--- QUESTION 10 ---');
console.log('Predict output:');
console.log(`
console.log(typeof notDeclared);
console.log(typeof declaredVar);
var declaredVar;
`);
console.log('ANSWER: undefined, undefined');

console.log('Q10 - Not declared:', typeof notDeclared); // undefined
console.log('Q10 - Declared var:', typeof declaredVar); // undefined (hoisted but not initialized)

/*
==================================================
SECTION 3: NODE.JS SPECIFIC QUESTIONS
==================================================
*/

console.log('\n' + '='.repeat(80));
console.log('SECTION 3: NODE.JS-SPECIFIC QUESTIONS');
console.log('='.repeat(80));

`
Q1: What is the global object in Node.js and how does var affect it?

A: In Node.js, the global object is 'global' (not 'window' like browsers)
   
   var x = 5;
   global.x // undefined (var is module-scoped, not global)
   
   Global variables in Node:
   - global.process
   - global.console
   - globalThis (ES2020, works in both Node and browsers)

Q2: What is the difference between global scope and module scope in Node.js?

A: Browser:      global scope = window
   Node.js:      global scope = global
   Module scope: Each file is a separate module
                 var in file is NOT accessible from another file
   
   To share: use module.exports and require()

Q3: How do var, let, const affect module exports?

A: var x = 5;
   console.log(module.exports.x); // undefined (not exported)
   
   module.exports.x = x; // Must explicitly export
   
   With let/const: same behavior, also must explicitly export

Q4: In Node.js, what's the difference between these?

A: var x = 5;
   // x is in module scope, NOT in global scope
   
   global.x = 5;
   // x is truly global, accessible everywhere
   
   In browsers, both would be window properties

Q5: What happens with this in Node.js modules?

A: In browsers:  'this' at top level = window
   In Node.js:   'this' at top level = module.exports
   
   function test() {
     console.log(this);
   }
   test(); // 'this' depends on how called

Q6: How does let/const help prevent global pollution in Node.js?

A: var was global-prone (in browsers, added to global)
   let/const are block-scoped, safer architectural choice
   
   Benefits in Node:
   - Prevents accidental global variables
   - Better code organization
   - Reduces bugs from variable conflicts

Q7: What about const in Node.js modules?

A: const is preferred for Node.js modules because:
   1. Prevents reassignment accidents
   2. Signals intent (shouldn't change)
   3. Works with require (which is synchronous)
   
   const config = require('./config');
   config.value = 10; // Allowed (mutation)
   config = {}; // Error (reassignment)

Q8: How does hoisting affect Node.js applications?

A: With var, functions could be called before declaration:
   test(); // Works (hoisted)
   function test() { console.log('hi'); }
   
   With let/const, same function would error:
   test(); // Error: TDZ
   let test = () => { console.log('hi'); };
   
   Best practice: Declare before using

Q9: What's the impact of var on async code in Node.js?

A: Classic issue (addressed by let/const):
   
   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 100);
   }
   // Output: 3, 3, 3 (all reference same 'i')
   
   for (let i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 100);
   }
   // Output: 0, 1, 2 (each iteration gets own 'i')
   
   Critical in Node.js event loop scenarios

Q10: How do you handle let/const with Node.js exports?

A: Method 1: Export after declaration
   const config = { value: 10 };
   module.exports = config;
   
   Method 2: Direct export
   module.exports = {
     config: { value: 10 }
   };
   
   Method 3: Multiple exports
   module.exports.fn1 = () => {};
   module.exports.fn2 = () => {};
   
   const/let prevent reassignment, which is safer

Q11: What about const functions in Node.js?

A: const func = () => { };
   func(); // Works
   
   const function() { } // Error: Invalid syntax
   
   Benefits:
   - Prevents function reassignment
   - Must be hoisted manually (TDZ applies)
   - Safer for larger codebases

Q12: How do var/let/const interact with closures in Node.js?

A: Closures work same way:
   
   function outer() {
     var x = 10;
     let y = 20;
     const z = 30;
     
     return function inner() {
       console.log(x, y, z); // All accessible
     };
   }
   
   But with loops (Node async), use let/const:
   
   for (let i of arr) { // Creates new binding each iteration
     asyncOp(() => console.log(i));
   }

Q13: What's the performance difference in Node.js?

A: var: Slightly faster (function-scoped, simpler analysis)
   let: Same (block-scoped, more analysis needed)
   const: Same (block-scoped)
   
   In practice: No significant difference
   Use based on semantics, not performance

Q14: How do blocking issues relate to var/let/const in Node.js?

A: var: Global pollution -> hard to track
   let/const: Scoped -> easier to track behavior
   
   In Node event loop:
   - Use let/const to prevent accidental globals
   - Prevents race conditions in async code
   - Clearer variable lifetime

Q15: What's the interview key point between JS and Node.js?

A: JavaScript: var/let/const are language features
   Node.js: They affect:
   - Module scope (each file is separate)
   - Global namespace pollution (var bad)
   - Async code behavior (let/const better)
   - Closure interactions
   - Export/import patterns
   
   KEY: Understanding scope is critical for Node.js
        because it's modular and event-driven
`;

console.log('Q1: Global object differences');
console.log('- Browser: window');
console.log('- Node.js: global (but var in file != global.var)');

console.log('\nQ2: Module scope vs global scope');
console.log('- Each Node file is separate module');
console.log('- var in file is module-scoped, not globally visible');

console.log('\nQ3: Why const is preferred in Node.js');
console.log('- Prevents reassignment');
console.log('- Signals immutability intent');
console.log('- Safer with require() (CommonJS)');

console.log('\nQ4: The async loop problem with var');
console.log('- var creates shared reference across iterations');
console.log('- let/const create new binding each iteration');
console.log('- Critical for setTimeout/promises in loops');

console.log('\nQ5: Closures and let/const in Node.js');
console.log('- let/const create proper closure scope');
console.log('- Essential for event-driven architecture');
console.log('- Each callback gets correct variable binding');

console.log('\nQ6: Performance in Node.js');
console.log('- No significant differences between var/let/const');
console.log('- Use based on semantic correctness');
console.log('- Scoping clarity matters for maintainability');

/*
==================================================
SECTION 4: PRACTICAL NODE.JS SCENARIOS
==================================================
*/

console.log('\n' + '='.repeat(80));
console.log('SECTION 4: PRACTICAL NODE.JS SCENARIOS');
console.log('='.repeat(80));

console.log('\n--- Scenario 1: Module Exports ---');
const scenario1Module = {
  config: { port: 3000 },
  getPort: function() {
    return this.config.port;
  }
};
console.log('Using const for module exports is safe');

console.log('\n--- Scenario 2: Event Emitter Loops ---');
console.log('❌ WRONG - uses var:');
console.log(`
for (var i = 0; i < 5; i++) {
  emitter.on('data', () => console.log(i)); // Always prints 5
}
`);

console.log('✓ CORRECT - uses let:');
console.log(`
for (let i = 0; i < 5; i++) {
  emitter.on('data', () => console.log(i)); // Prints 0,1,2,3,4
}
`);

console.log('\n--- Scenario 3: Middleware Functions ---');
console.log('Preferred pattern with const:');
console.log(`
const authMiddleware = (req, res, next) => {
  if (req.header('auth')) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Cannot accidentally do: authMiddleware = something else
app.use(authMiddleware);
`);

console.log('\n--- Scenario 4: Database Connections ---');
console.log('Safe pattern with const:');
console.log(`
const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to DB');
});

// db = {} // Error: Cannot reassign const
`);

/*
==================================================
SECTION 5: SUMMARY & BEST PRACTICES
==================================================
*/

console.log('\n' + '='.repeat(80));
console.log('SECTION 5: SUMMARY FOR NODE.JS INTERVIEWS');
console.log('='.repeat(80));

const summary = `
┌─────────────────────────────────────────────────────────────────────────────┐
│ VAR, LET, CONST IN JAVASCRIPT & NODE.JS                                    │
└─────────────────────────────────────────────────────────────────────────────┘

QUICK FACTS:
✓ var   = Function-scoped, hoisted, can re-declare (AVOID in modern code)
✓ let   = Block-scoped, TDZ, cannot re-declare (Use for variables)
✓ const = Block-scoped, TDZ, cannot re-declare/reassign (Use by default)

KEY NODE.JS DIFFERENCES:
✓ No global pollution: var in file ≠ global.var
✓ Async loops: Must use let/const to capture correct value
✓ Module scope: Each file is separate, var is file-local not global
✓ Closures: let/const create proper closure scope per iteration

INTERVIEW QUESTIONS YOU'LL GET:
1. Explain var, let, const differences
2. What's hoisting?
3. Code question: Predict async loop output
4. Why prefer const in Node.js?
5. What is TDZ (Temporal Dead Zone)?
6. How does module.exports work with let/const?
7. Performance implications?
8. Closure behavior with loops?

BEST PRACTICES FOR NODE.JS:
1. Use const by default (prevents accidents)
2. Use let when reassignment needed (rarely)
3. Never use var in new code
4. Be careful with async loops (use let, not var)
5. Understand TDZ for let/const
6. Know the difference between mutation and reassignment

COMMON MISTAKES:
❌ Using var in loops with async code
❌ Modifying const objects thinking it's immutable
❌ Not understanding module scope vs global scope
❌ Hoisting surprises with var hoisting
❌ TDZ errors with let/const before initialization

WHEN TO USE:
- const: 90% of the time (default choice)
- let: When you need to reassign (10%)
- var: Never (unless maintaining old code)
`;

console.log(summary);

console.log('\n' + '='.repeat(80));
console.log('END OF JAVASCRIPT FUNDAMENTALS FOR NODE.JS');
console.log('='.repeat(80));
