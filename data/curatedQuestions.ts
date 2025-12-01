import { Question, QuestionType } from '../types';

export const CURATED_JS_INTERVIEW: Question[] = [
  // --- JAVASCRIPT CODING CHALLENGES ---
  {
    id: 'js-code-1',
    topic: 'Algorithms',
    type: QuestionType.Code,
    text: 'Convert an n-dimensional array to a 1-dimensional array without using `flat` or `reduce`. Use recursion.',
    hint: 'Iterate through the array. If an element is an array, call the function recursively.',
    modelAnswer: `
function flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) ? res.push(...flatten(arr[i])) : res.push(arr[i]);
  }
  return res;
}`
  },
  {
    id: 'js-code-2',
    topic: 'Algorithms',
    type: QuestionType.Code,
    text: 'Convert an n-dimensional array to a 1-dimensional array using `reduce`.',
    hint: 'Use reduce to accumulate values, concatenating recursive calls if the item is an array.',
    modelAnswer: `
const flatten = (arr) => arr.reduce((acc, val) => 
  Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []
);`
  },
  {
    id: 'js-code-3',
    topic: 'Object Manipulation',
    type: QuestionType.Code,
    text: 'Print all keys of a nested object in dot notation format (e.g., "qualifications.0.education").',
    hint: 'Recursively traverse keys. Keep a parent key prefix string.',
    modelAnswer: `
function printKeys(obj, prefix = '') {
  for (let key in obj) {
    let fullKey = prefix ? \`\${prefix}.\${key}\` : key;
    typeof obj[key] === 'object' && obj[key] ? printKeys(obj[key], fullKey) : console.log(fullKey);
  }
}`
  },
  {
    id: 'js-code-4',
    topic: 'Data Structures',
    type: QuestionType.Code,
    text: 'Calculate the frequency count of items in an array and return an object sorted by key (a-z). Input: ["a", "d", "a", "c", ...]',
    hint: 'Use a map or object for counting, then sort the keys and rebuild the object.',
    modelAnswer: `
function getFreq(arr) {
  const counts = arr.reduce((acc, i) => ({...acc, [i]: (acc[i] || 0) + 1}), {});
  return Object.keys(counts).sort().reduce((acc, key) => ({...acc, [key]: counts[key]}), {});
}`
  },
  {
    id: 'js-code-5',
    topic: 'String Parsing',
    type: QuestionType.Code,
    text: 'Find the max value from patterned string items in an array. Input: ["10-50-20", "80-90-35"]. Expected Output: [50, 90].',
    hint: 'Split each string by "-", convert to numbers, find max, and push to result.',
    modelAnswer: `
const findMax = (arr) => arr.map(s => Math.max(...s.split('-').map(Number)));`
  },
  {
    id: 'js-code-6',
    topic: 'Algorithms',
    type: QuestionType.Code,
    text: 'Find the missing values in an array of incremental natural numbers (e.g. 1..10). Input: [1, 2, 3, 5, 7, ...].',
    hint: 'Iterate from min to max expected values and check if they exist in the array.',
    modelAnswer: `
function findMissing(arr) {
  let missing = [], set = new Set(arr);
  for (let i = arr[0]; i <= arr[arr.length-1]; i++) {
    if (!set.has(i)) missing.push(i);
  }
  return missing;
}`
  },
  {
    id: 'js-code-7',
    topic: 'Array Logic',
    type: QuestionType.Code,
    text: 'Remove duplicates from array [10, 11, 9, 11...] and find odd numbers greater than 10.',
    hint: 'Use Set for uniqueness, then filter.',
    modelAnswer: `
const arr = [10, 11, 9, 11, 8, 5, 2, 9, 15, 5];
const unique = [...new Set(arr)].sort((a,b) => a - b);
const res = unique.filter(n => n % 2 !== 0 && n > 10); // [11, 15]`
  },
  {
    id: 'js-code-8',
    topic: 'Deep Clone',
    type: QuestionType.Code,
    text: 'Implement deep copy of an n-level nested object without external libraries.',
    hint: 'Recursive function that handles Arrays and Objects specifically.',
    modelAnswer: `
function deepClone(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepClone(v)]));
}`
  },
  {
    id: 'js-code-9',
    topic: 'Algorithms',
    type: QuestionType.Code,
    text: 'Group anagrams together from an array of strings. Input: ["act","pots","tops","cat"].',
    hint: 'Sort each string to use as a key in a map.',
    modelAnswer: `
function groupAnagrams(strs) {
  const map = {};
  for (let s of strs) {
    let key = s.split('').sort().join('');
    (map[key] = map[key] || []).push(s);
  }
  return Object.values(map);
}`
  },

  // --- REACT CODING CHALLENGES ---
  {
    id: 'react-code-1',
    topic: 'React Hooks',
    type: QuestionType.Code,
    text: 'Build a Stopwatch component with Start, Stop, and Reset buttons.',
    hint: 'Use `setInterval` inside `useEffect` with a running state.',
    modelAnswer: `
function Stopwatch() {
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  useEffect(() => {
    let i; if (run) i = setInterval(() => setT(c => c+1), 1000);
    return () => clearInterval(i);
  }, [run]);
  return <>{t}s <button onClick={()=>setRun(true)}>Start</button> <button onClick={()=>setRun(false)}>Stop</button></>;
}`
  },
  {
    id: 'react-code-2',
    topic: 'React State',
    type: QuestionType.Code,
    text: 'Create a To-Do List with an input and Add button. New items appear below.',
    hint: 'State array for list, state string for input.',
    modelAnswer: `
function Todo() {
  const [list, setList] = useState([]);
  const [val, setVal] = useState('');
  return (
    <>
      <input value={val} onChange={e=>setVal(e.target.value)} />
      <button onClick={()=>{setList([...list, val]); setVal('')}}>Add</button>
      {list.map((t,i) => <div key={i}>{t}</div>)}
    </>
  );
}`
  },
  {
    id: 'react-code-3',
    topic: 'React CSS/UI',
    type: QuestionType.Code,
    text: 'Create a Progress Bar component without external libraries.',
    hint: 'A div within a div, inner div width controlled by prop.',
    modelAnswer: `
const ProgressBar = ({ v }) => (
  <div style={{background: '#eee', width: '100%'}}>
    <div style={{width: \`\${v}%\`, background: 'blue', height: 10, transition: '0.3s'}} />
  </div>
);`
  },
  {
    id: 'react-code-4',
    topic: 'Context API',
    type: QuestionType.Code,
    text: 'Create a ThemeProvider with "Dark" and "Light" modes and a toggle UI.',
    hint: 'Create Context, Provider wraps children, export useTheme hook.',
    modelAnswer: `
const Ctx = createContext();
const Provider = ({children}) => {
  const [theme, setTheme] = useState('light');
  return <Ctx.Provider value={{theme, setTheme}}><div className={theme}>{children}</div></Ctx.Provider>;
};`
  },
  {
    id: 'react-code-5',
    topic: 'React Hooks',
    type: QuestionType.Code,
    text: 'Implement a custom hook `useDebounce` to delay a value update.',
    hint: 'useEffect with setTimeout that clears on dependency change.',
    modelAnswer: `
function useDebounce(val, delay) {
  const [dVal, setDVal] = useState(val);
  useEffect(() => {
    const h = setTimeout(() => setDVal(val), delay);
    return () => clearTimeout(h);
  }, [val, delay]);
  return dVal;
}`
  },
  {
    id: 'react-code-6',
    topic: 'Lifecycle',
    type: QuestionType.Code,
    text: 'Console log "Mounted" and "Unmounted" messages for components to demonstrate lifecycle.',
    hint: 'useEffect with empty dependency array and return cleanup function.',
    modelAnswer: `
useEffect(() => {
  console.log('Mounted');
  return () => console.log('Unmounted');
}, []);`
  },

  // --- MONGODB & BACKEND ---
  {
    id: 'mongo-query',
    topic: 'MongoDB Aggregation',
    type: QuestionType.Code,
    text: 'Write a MongoDB query to return a document but filter the "employees" array to only include "Full Stack Developer" roles.',
    hint: 'Use the aggregation pipeline with $project and $filter.',
    modelAnswer: `
db.coll.aggregate([
  { $project: {
      employees: { 
        $filter: { input: "$employees", as: "e", cond: { $eq: ["$$e.role", "Full Stack Developer"] } } 
      }
  }}
])`
  },
  {
    id: 'node-middleware',
    topic: 'Express JS',
    type: QuestionType.Code,
    text: 'Create a common error handling middleware for Express that catches errors from all routes.',
    hint: 'Define it after all routes. Function signature must have 4 arguments (err, req, res, next).',
    modelAnswer: `
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});`
  },

  // --- THEORETICAL QUESTIONS (Refined for crispness) ---
  {
    id: 'css-swap',
    topic: 'CSS Logic',
    text: 'Assume we have 10 cards UI, how to swap 1st card with 5th card only with CSS properties?',
    hint: 'Flexbox order.',
    modelAnswer: 'Use CSS Flexbox or Grid and the `order` property. Set the 1st card to `order: 5` and the 5th card to `order: 1`.'
  },
  {
    id: 'js-modules',
    topic: 'Module Systems',
    text: 'What are the differences between CJS, ESM, and MJS?',
    hint: 'require vs import.',
    modelAnswer: 'CJS uses synchronous `require()`, mostly for Node.js. ESM uses asynchronous `import/export`, the standard for browsers. MJS is a file extension to force Node.js to treat files as ESM.'
  },
  {
    id: 'react-fiber',
    topic: 'React Internals',
    text: 'What is React Fiber and how does it relate to reconciliation?',
    hint: 'Incremental rendering.',
    modelAnswer: 'Fiber is React\'s reconciliation engine that splits rendering work into small units (fibers). This allows React to pause, abort, or prioritize updates, keeping the UI responsive.'
  },
  {
    id: 'js-eventloop-macro',
    topic: 'Event Loop',
    text: 'Why are setTimeout considered Macrotasks and Promises Microtasks?',
    hint: 'Queue priority.',
    modelAnswer: 'Microtasks (Promises) have higher priority and execute immediately after the current script. Macrotasks (setTimeout) are queued to run in the next event loop cycle.'
  }
];