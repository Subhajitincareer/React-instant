#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

// Chapters list
const chaptersList = [
    '1. Introduction',
    '2. Basic Syntax',
    '3. Variables & Constants',
    '4. Operators',
    '5. Control Flow',
    '6. Objects & Arrays',
    '7. Functions',
    '8. Scope & Hoisting',
    '9. Strings',
    '10. Numbers & Math',
    '11. Dates',
    '12. Regular Expressions',
    '13. Error Handling',
    '14. JSON',
    '15. DOM Manipulation',
    '16. Events',
    '17. Timers',
    '18. ES6 & Modern JS',
    '19. Modules',
    '20. Promises & Async/Await',
    '21. AJAX & Fetch API',
    '22. Local Storage & Session Storage',
    '23. Debugging & Best Practices'
];

// Chapter data: You can keep expanding this as you wish!
const chapterData = [
    {
        name: '1. Introduction',
        tables: [
            {
                title: 'Introduction to JavaScript',
                columns: ['Topic', 'Description', 'Example'],
                rows: [
                    ['What is JavaScript?', 'A lightweight, interpreted programming language for the web', '<script>console.log("Hello World")</script>'],
                    ['Usage', 'Client-side scripting, server-side (Node.js), embedded devices', 'document.getElementById("demo").innerHTML = "JS!"'],
                    ['First JS Code', 'How to write your first script', '<script>alert("Hi!")</script>'],
                ]
            }
        ]
    },
    {
        name: '2. Basic Syntax',
        tables: [
            {
                title: 'JavaScript Syntax',
                columns: ['Concept', 'Description', 'Example'],
                rows: [
                    ['Statements', 'Instructions that perform actions', 'let x = 5;'],
                    ['Semicolons', 'Ends statements (optional, but recommended)', 'let a = 10;'],
                    ['Comments', 'Single or multi-line explanations', '// single line\n/* multi-line */'],
                    ['Case Sensitivity', 'JS is case sensitive', 'let x vs let X'],
                ]
            }
        ]
    },
    {
        name: '3. Variables & Constants',
        tables: [
            {
                title: 'Variables and Constants',
                columns: ['Type', 'Description', 'Example'],
                rows: [
                    ['var', 'Function-scoped variable (old style)', 'var a = 1;'],
                    ['let', 'Block-scoped variable', 'let b = 2;'],
                    ['const', 'Block-scoped constant', 'const PI = 3.14;'],
                    ['Hoisting', 'var declarations are hoisted, let/const are not', 'console.log(a); var a = 2;'],
                ]
            }
        ]
    },
    {
        name: '4. Operators',
        tables: [
            {
                title: 'JavaScript Operators',
                columns: ['Operator', 'Description', 'Example'],
                rows: [
                    ['+', 'Addition or string concatenation', 'a + b'],
                    ['-', 'Subtraction', 'a - b'],
                    ['*', 'Multiplication', 'a * b'],
                    ['/', 'Division', 'a / b'],
                    ['%', 'Modulus (remainder)', 'a % b'],
                    ['==', 'Equal to (loose)', 'a == b'],
                    ['===', 'Equal value & type (strict)', 'a === b'],
                    ['!=', 'Not equal', 'a != b'],
                    ['!==', 'Not equal value or type', 'a !== b'],
                    ['>', 'Greater than', 'a > b'],
                    ['<', 'Less than', 'a < b'],
                    ['&&', 'Logical AND', 'a && b'],
                    ['||', 'Logical OR', 'a || b'],
                    ['!', 'Logical NOT', '!a']
                ]
            }
        ]
    },
    {
        name: '5. Control Flow',
        tables: [
            {
                title: 'Control Flow Statements',
                columns: ['Statement', 'Description', 'Example'],
                rows: [
                    ['if', 'Conditional execution', 'if (x > 0) {...}'],
                    ['else', 'Alternative branch', 'if (...) {...} else {...}'],
                    ['else if', 'Multiple alternatives', 'if (...) {...} else if (...) {...}'],
                    ['switch', 'Multi-way branching', 'switch(val){case 1: ...}'],
                    ['for', 'Loop for fixed repetitions', 'for(let i=0;i<5;i++){...}'],
                    ['while', 'Loop while condition true', 'while(x < 5){...}'],
                    ['do...while', 'Loop executes at least once', 'do {...} while(x < 5);'],
                    ['break', 'Exit current loop/statement', 'break;'],
                    ['continue', 'Skip to next iteration', 'continue;'],
                ]
            }
        ]
    },
    {
        name: '6. Objects & Arrays',
        tables: [
            {
                title: 'Common JavaScript Array & Object Methods & Formulas',
                columns: ['Method', 'Description', 'Example'],
                rows: [
                    ['.push()', 'Adds one or more elements to the end of an array', 'arr.push(5)'],
                    ['.pop()', 'Removes the last element of the array and returns it', 'arr.pop()'],
                    ['.shift()', 'Removes the first element of the array and returns it', 'arr.shift()'],
                    ['.unshift()', 'Adds one or more elements at the beginning of an array', 'arr.unshift(0)'],
                    ['.join()', 'Joins all elements into a string, separated by given separator', "arr.join('-')"],
                    ['.slice()', 'Returns a shallow copy of a portion of an array', 'arr.slice(1, 3)'],
                    ['.splice()', 'Changes array content by removing or replacing elements', 'arr.splice(2, 1, "new")'],
                    ['.map()', 'Creates a new array by applying a function to each element', 'arr.map(x => x * 2)'],
                    ['.filter()', 'Creates a new array with elements that pass a test', 'arr.filter(x => x > 2)'],
                    ['.reduce()', 'Executes a reducer function to reduce array to a value', 'arr.reduce((a,b) => a + b, 0)'],
                    ['.forEach()', 'Executes a provided function once for each array element', 'arr.forEach(x => console.log(x))'],
                    ['.find()', 'Returns the first element that satisfies a condition', 'arr.find(x => x === 5)'],
                    ['.includes()', 'Checks if an array includes a value', 'arr.includes(3)'],
                    ['.indexOf()', 'Returns the first index of an element, or -1 if not found', 'arr.indexOf(2)'],
                    ['.length', 'Property that returns the number of elements in the array', 'arr.length'],
                    ['.concat()', 'Merges two or more arrays', '[1,2].concat([3,4])'],
                    ['.reverse()', 'Reverses the order of the elements in the array', 'arr.reverse()'],
                    ['.sort()', 'Sorts the elements of an array', 'arr.sort((a,b) => a - b)'],
                    ['Array.isArray()', 'Checks if a value is an array', 'Array.isArray(arr)'],
                    ['Object.keys()', "Returns an array of a given object's own enumerable property names", 'Object.keys(obj)'],
                    ['Object.values()', "Returns an array of a given object's own enumerable property values", 'Object.values(obj)'],
                    ['Object.entries()', 'Returns an array of key-value pairs of an object', 'Object.entries(obj)'],
                    ['Object.assign()', 'Copies enumerable properties from source to target object', 'Object.assign(target, source)'],
                    ['Array.from()', 'Creates a new array from an array-like or iterable object', 'Array.from("foo")'],
                    ['Array.of()', 'Creates a new array instance from a variable number of arguments', 'Array.of(5)'],
                    ['delete obj.key', 'Removes a property from an object', 'delete obj.name'],
                    ['in', 'Checks if a property exists in an object', "'name' in obj"],
                    ['hasOwnProperty()', 'Returns a boolean if the object has the property', 'obj.hasOwnProperty("name")'],
                    ['Object.freeze()', 'Prevents modification to an object', 'Object.freeze(obj)'],
                    ['Object.seal()', 'Prevents adding/removing properties from an object', 'Object.seal(obj)'],
                    ['Object.create()', 'Creates a new object with the specified prototype', 'Object.create(proto)'],
                ]
            }
        ]
    },
    // Add more chapter data for chapters 7–23, same structure as above 
    {
        name: '7. Functions',
        tables: [
            {
                title: 'JavaScript Functions',
                columns: ['Concept', 'Description', 'Example'],
                rows: [
                    ['Function Declaration', 'Basic function definition', 'function greet(name) { return "Hi " + name; }'],
                    ['Function Expression', 'Assign function to a variable', 'const sum = function(a, b) { return a + b; }'],
                    ['Arrow Function', 'Short syntax for functions', 'const double = x => x * 2'],
                    ['Parameters & Arguments', 'Values passed to a function', 'greet("Sam")'],
                    ['Default Parameters', 'Function parameters with defaults', 'function demo(x=5) { ... }'],
                    ['Rest Parameters', 'Handle many arguments as an array', 'function fn(...args) { }'],
                    ['Return Statement', 'Specifies the function output', 'return result'],
                    ['IIFE', 'Immediately-Invoked Function Expression', '(function(){ ... })()'],
                ],
            },
        ],
    },
    {
        name: '8. Scope & Hoisting',
        tables: [
            {
                title: 'Scope and Hoisting Concepts',
                columns: ['Concept', 'Description', 'Example'],
                rows: [
                    ['Global Scope', 'Variables accessible everywhere', 'let x = 10;'],
                    ['Local/Function Scope', 'Variables accessible within a function', 'function test() { let a = 3; }'],
                    ['Block Scope', 'let/const inside {} creates block scope', 'if (true) { let b = 5; }'],
                    ['var Hoisting', 'var declarations hoisted to top of function/scope', 'console.log(a); var a = 2;'],
                    ['let/const Hoisting', 'let/const are hoisted but not initialized', 'console.log(b); let b = 4; // ReferenceError'],
                    ['Closure', 'Functions remember variables from their scope', 'function outer() { let x = 1; return function inner() { console.log(x); } }'],
                ],
            },
        ],
    },
    {
        name: '9. Strings',
        tables: [
            {
                title: 'Common String Methods & Properties',
                columns: ['Method/Property', 'Description', 'Example'],
                rows: [
                    ['.length', 'Returns length of string', '"test".length'],
                    ['.toUpperCase()', 'Converts to uppercase', '"js".toUpperCase()'],
                    ['.toLowerCase()', 'Converts to lowercase', '"JS".toLowerCase()'],
                    ['.charAt()', 'Returns character at index', '"abc".charAt(1)'],
                    ['.includes()', 'Checks if substring is present', '"hello".includes("el")'],
                    ['.indexOf()', 'First occurrence of substring', '"hello".indexOf("l")'],
                    ['.lastIndexOf()', 'Last occurrence of substring', '"hello".lastIndexOf("l")'],
                    ['.slice()', 'Extracts part of string', '"hello".slice(1, 4)'],
                    ['.substring()', 'Similar to slice', '"hello".substring(1, 4)'],
                    ['.replace()', 'Replaces substring', '"foo".replace("f", "b")'],
                    ['.split()', 'Splits string into array', '"a,b".split(",")'],
                    ['.trim()', 'Removes whitespace from ends', '" test ".trim()'],
                    ['.concat()', 'Joins two strings', '"a".concat("b")'],
                    ['Template literals', 'String interpolation with backticks', '`Value: ${x}`'],
                ],
            },
        ],
    },
    {
        name: '10. Numbers & Math',
        tables: [
            {
                title: 'Numbers, Math Methods, and Properties',
                columns: ['Method/Property', 'Description', 'Example'],
                rows: [
                    ['Number()', 'Converts to Number type', 'Number("123")'],
                    ['parseInt()', 'Parses string to integer', 'parseInt("42px")'],
                    ['parseFloat()', 'Parses string to float', 'parseFloat("3.14")'],
                    ['isNaN()', 'Checks if value is NaN', 'isNaN("a")'],
                    ['toFixed()', 'Rounds number to fixed decimals', '(2.345).toFixed(2)'],
                    ['Math.abs()', 'Returns absolute value', 'Math.abs(-3)'],
                    ['Math.round()', 'Rounds to nearest integer', 'Math.round(2.7)'],
                    ['Math.floor()', 'Rounds down', 'Math.floor(2.9)'],
                    ['Math.ceil()', 'Rounds up', 'Math.ceil(2.1)'],
                    ['Math.max()', 'Largest of arguments', 'Math.max(1, 2, 9)'],
                    ['Math.min()', 'Smallest of arguments', 'Math.min(1, 2, 9)'],
                    ['Math.random()', 'Random number [0,1)', 'Math.random()'],
                    ['Math.pow()', 'Exponentiation', 'Math.pow(2, 3)'],
                    ['Math.sqrt()', 'Square root', 'Math.sqrt(25)'],
                ],
            },
        ],
    },
    {
        name: '11. Dates',
        tables: [
            {
                title: 'Date Methods & Usage',
                columns: ['Method/Property', 'Description', 'Example'],
                rows: [
                    ['Date()', 'Creates a new date object', 'let d = new Date()'],
                    ['.getFullYear()', 'Gets 4-digit year', 'd.getFullYear()'],
                    ['.getMonth()', 'Gets month (0-11)', 'd.getMonth()'],
                    ['.getDate()', 'Gets day of month', 'd.getDate()'],
                    ['.getDay()', 'Gets day of week (0=Sun)', 'd.getDay()'],
                    ['.getHours()', 'Hour of the day', 'd.getHours()'],
                    ['.getMinutes()', 'Minutes of the hour', 'd.getMinutes()'],
                    ['.getTime()', 'Milliseconds since 1970', 'd.getTime()'],
                    ['.setFullYear()', 'Sets year', 'd.setFullYear(2025)'],
                    ['.setMonth()', 'Sets month', 'd.setMonth(11)'],
                    ['Date.now()', 'Current ms since 1970', 'Date.now()'],
                    ['toLocaleString()', 'Localized string', 'd.toLocaleString()'],
                ],
            },
        ],
    },
    {
        name: '12. Regular Expressions',
        tables: [
            {
                title: 'Basic RegExp Patterns & Methods',
                columns: ['Pattern/Method', 'Description', 'Example'],
                rows: [
                    ['/abc/', 'Matches literal "abc"', '/abc/.test("abc")'],
                    ['.test()', 'Tests for match (true/false)', '/a/.test("cat")'],
                    ['.exec()', 'Returns match details or null', '/\\d+/.exec("12abc")'],
                    ['.match()', 'Gets matches in string', '"abc123".match(/\\d+/)'],
                    ['.replace()', 'Replace match in string', '"1a2".replace(/\\d/g, "*")'],
                    ['.search()', 'Find index of match', '"abc1".search(/\\d/)'],
                    ['.split()', 'Split string by regexp', '"a1b2".split(/\\d/)'],
                    ['Character classes', 'Match sets, e.g., [a-z]', '/[a-z]/.test("x")'],
                    ['Quantifiers', '* + ? {n}', '/a{2,}/.test("aaa")'],
                    ['Anchors', '^ $', '/^a/.test("abc")'],
                    ['Groups', '( )', '/(ab)+/.test("abab")'],

                ],
            },
        ],
    },
    {
        name: '13. Error Handling',
        tables: [
            {
                title: 'Error Handling Methods & Best Practices',
                columns: ['Concept/Method', 'Description', 'Example'],
                rows: [
                    ['try...catch', 'Handle errors gracefully', 'try { riskyFn() } catch (e) { console.log(e) }'],
                    ['finally', 'Block always runs after try/catch', 'try {} catch(e) {} finally { cleanup(); }'],
                    ['throw', 'Manually throw an error', 'throw new Error("Something went wrong!")'],
                    ['Error object', 'Built-in error object', 'const err = new Error("msg")'],
                    ['Custom error', 'Define your own error types', 'class CustomError extends Error {}'],
                ],
            },
        ],
    },
    {
        name: '14. JSON',
        tables: [
            {
                title: 'JSON (JavaScript Object Notation) Usage',
                columns: ['Method/Concept', 'Description', 'Example'],
                rows: [
                    ['JSON.stringify()', 'Convert JS object to JSON string', 'JSON.stringify({a:1, b:2})'],
                    ['JSON.parse()', 'Convert JSON string to JS object', 'JSON.parse("{\\"a\\":1, \\"b\\":2}")'],
                    ['Valid JSON', 'Must use double quotes on keys/strings', '{"name": "Sam"}'],
                    ['Nested JSON', 'Objects/arrays inside JSON', '{"user": {"name":"Sam"}, "hobbies":["js","node"]}'],
                ],
            },
        ],
    },
    {
        name: '15. DOM Manipulation',
        tables: [
            {
                title: 'DOM Selection & Manipulation',
                columns: ['Method/Concept', 'Description', 'Example'],
                rows: [
                    ['getElementById()', 'Get element by ID', 'document.getElementById("demo")'],
                    ['getElementsByClassName()', 'All elements by class', 'document.getElementsByClassName("cls")'],
                    ['querySelector()', 'First element matching selector', 'document.querySelector(".main")'],
                    ['querySelectorAll()', 'All elements matching selector', 'document.querySelectorAll("p")'],
                    ['innerHTML', 'Get/set HTML content', 'el.innerHTML = "<b>Hi</b>"'],
                    ['textContent', 'Get/set text content', 'el.textContent = "Hello"'],
                    ['setAttribute()', 'Set an attribute', 'el.setAttribute("src", "img.jpg")'],
                    ['style', 'Change inline CSS', 'el.style.color = "red"'],
                    ['appendChild()', 'Add child node', 'parent.appendChild(child)'],
                    ['removeChild()', 'Remove child node', 'parent.removeChild(child)']
                ],
            },
        ],
    },
    {
        name: '16. Events',
        tables: [
            {
                title: 'Event Handling',
                columns: ['Method/Concept', 'Description', 'Example'],
                rows: [
                    ['onclick', 'Inline click event handler', '<button onclick="myFn()">Go</button>'],
                    ['addEventListener()', 'Modern way to handle events', 'el.addEventListener("click", myFn)'],
                    ['event object', 'Event details in handler', 'el.onclick = function(e) { console.log(e.type); }'],
                    ['Mouse events', 'React to mouse actions', '"click", "mouseover", "mouseout"'],
                    ['Keyboard events', 'React to keyboard actions', '"keydown", "keyup"'],
                    ['Prevent default', 'Block default action', 'event.preventDefault()'],
                    ['Stop propagation', 'Stop bubbling up', 'event.stopPropagation()'],
                ],
            },
        ],
    },
    {
        name: '17. Timers',
        tables: [
            {
                title: 'setTimeout / setInterval / clearTimeout / clearInterval',
                columns: ['Method', 'Description', 'Example'],
                rows: [
                    ['setTimeout()', 'Run once after delay', 'setTimeout(() => alert("Hello"), 1000)'],
                    ['clearTimeout()', 'Cancel timeout', 'clearTimeout(id)'],
                    ['setInterval()', 'Run repeatedly every interval', 'setInterval(fn, 2000)'],
                    ['clearInterval()', 'Cancel interval', 'clearInterval(id)'],
                ],
            },
        ],
    },
    {
        name: '18. ES6 & Modern JS',
        tables: [
            {
                title: 'Popular ES6+ and Modern JavaScript Features',
                columns: ['Feature', 'Description', 'Example'],
                rows: [
                    ['let & const', 'Block-scoped variable/constant', 'let a = 1; const b = 2;'],
                    ['Arrow Functions', 'Short function syntax', '(a, b) => a + b'],
                    ['Default Parameters', 'Function defaults', 'function add(x = 10) { ... }'],
                    ['Destructuring', 'Unpack values/props', 'const {a, b} = obj'],
                    ['Spread Operator', 'Expand arrays/objects', '[...arr1, ...arr2]'],
                    ['Rest Operator', 'Multiple args as array', 'function fn(...args) {}'],
                    ['Template Literals', 'Multiline & embedded expressions', '`Hello, ${name}!`'],
                    ['Classes', 'Class syntax', 'class Person { constructor(n) { this.name=n; } }'],
                    ['Promises', 'Asynchronous control', 'new Promise((res,rej)=>{})'],
                    ['Modules', 'Import/export code between files', 'import x from "./x.js";'],
                ],
            },
        ],
    },
    {
        name: '19. Modules',
        tables: [
            {
                title: 'JavaScript Module Systems',
                columns: ['Syntax/Concept', 'Description', 'Example'],
                rows: [
                    ['ES Modules', 'Standard import/export', 'import x from "./mod.js";\nexport default y;'],
                    ['CommonJS', 'Node.js require/module.exports', 'const x = require("./mod");\nmodule.exports = y;'],
                    ['Named Exports', 'Multiple exports per file', 'export function add() {}'],
                    ['Dynamic Import', 'Import asynchronously', 'const mod = await import("./mod.js");'],
                ],
            },
        ],
    },
    {
        name: '20. Promises & Async/Await',
        tables: [
            {
                title: 'Asynchronous Programming Tools',
                columns: ['Concept', 'Description', 'Example'],
                rows: [
                    ['Promise', 'Object representing future value', 'let p = new Promise((res,rej)=>{})'],
                    ['then()', 'Runs after promise fulfilled', 'p.then(val => console.log(val))'],
                    ['catch()', 'Runs after rejection', 'p.catch(err => ... )'],
                    ['finally()', 'Runs after settle', 'p.finally(() => ... )'],
                    ['Async function', 'Declares a function as async', 'async function fn() { ... }'],
                    ['Await', 'Pause in async function for promise', 'let data = await getData()'],
                ],
            },
        ],
    },
    {
        name: '21. AJAX & Fetch API',
        tables: [
            {
                title: 'Fetch / XMLHttpRequest / AJAX',
                columns: ['Method/Concept', 'Description', 'Example'],
                rows: [
                    ['fetch()', 'Modern AJAX call (returns promise)', 'fetch("https://api.com/data")'],
                    ['.then()', 'Handle response', 'fetch(...).then(resp => resp.json())'],
                    ['XMLHttpRequest', 'Old-school AJAX API', 'let xhr = new XMLHttpRequest(); xhr.open("GET", url);'],
                    ['async/await with fetch', 'Modern async fetch', 'const data = await fetch(url).then(r => r.json())'],
                ],
            },
        ],
    },
    {
        name: '22. Local Storage & Session Storage',
        tables: [
            {
                title: 'LocalStorage / SessionStorage Methods',
                columns: ['API/Method', 'Description', 'Example'],
                rows: [
                    ['localStorage.setItem()', 'Store key/value permanently', 'localStorage.setItem("x", "5")'],
                    ['localStorage.getItem()', 'Retrieve value', 'localStorage.getItem("x")'],
                    ['localStorage.removeItem()', 'Remove item', 'localStorage.removeItem("x")'],
                    ['localStorage.clear()', 'Clear all storage', 'localStorage.clear()'],
                    ['sessionStorage.setItem()', 'Session key/value', 'sessionStorage.setItem("y", "7")'],
                    ['sessionStorage.getItem()', 'Session value', 'sessionStorage.getItem("y")'],
                    ['sessionStorage.clear()', 'Clear all session storage', 'sessionStorage.clear()'],
                ],
            },
        ],
    },
    {
        name: '23. Debugging & Best Practices',
        tables: [
            {
                title: 'Debugging Tools & Best Practices',
                columns: ['Tool/Concept', 'Description', 'Example'],
                rows: [
                    ['console.log()', 'Prints debugging value', 'console.log(obj)'],
                    ['console.error()', 'Prints error values', 'console.error(err)'],
                    ['Debugger statement', 'Pauses execution if dev tools open', 'debugger;'],
                    ['Breakpoints', 'Pause code in browser dev tools', 'Use in Sources panel'],
                    ['Linting', 'Auto-check code quality', 'ESLint, JSHint'],
                    ['Code Formatting', 'Consistent code layout', 'Prettier'],
                    ['Separation of Concerns', 'Organize code by responsibility', 'Files by feature/module'],
                    ['Commenting', 'Describe non-obvious code', '// explanation...'],
                ],
            },
        ],
    }


];

async function main() {
    console.clear();
    console.log(chalk.cyan.bold('\n🟨 JavaScript Chapter Navigator 🟨\n'));

    while (true) {
        const { chapter } = await inquirer.prompt([
            {
                type: 'list',
                name: 'chapter',
                message: 'Select a chapter to view its details:',
                choices: [...chaptersList, new inquirer.Separator(), 'Exit'],
            },
        ]);

        if (chapter === 'Exit') {
            console.log(chalk.green('\nGoodbye!\n'));
            process.exit(0);
        }

        // Find chapter data by chapter name
        const selectedData = chapterData.find(c => c.name === chapter);

        if (selectedData && selectedData.tables && selectedData.tables.length > 0) {
            console.log(chalk.yellow(`\n${selectedData.name}\n`));
            selectedData.tables.forEach((table) => {
                console.log(chalk.magenta.bold(`${table.title}\n`));
                const tableData = table.rows.map((row) => {
                    const obj = {};
                    table.columns.forEach((col, i) => {
                        obj[col] = row[i];
                    });
                    return obj;
                });
                console.table(tableData);
            });
        } else {
            console.log(chalk.red('\nChapter data not found. (You can add it in the chapterData array!)\n'));
        }

        const { again } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'again',
                message: 'View another chapter?',
                default: true,
            },
        ]);
        if (!again) break;
    }

    console.log(chalk.green('\nGoodbye!\n'));
    process.exit(0);
}

main().catch((err) => console.error(chalk.red(err)));
