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
function flattenArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
// Usage: flattenArray([1, [2, [3, 4], 5]]) => [1, 2, 3, 4, 5]`
  },
  {
    id: 'js-code-2',
    topic: 'Algorithms',
    type: QuestionType.Code,
    text: 'Convert an n-dimensional array to a 1-dimensional array using `reduce`.',
    hint: 'Use reduce to accumulate values, concatenating recursive calls if the item is an array.',
    modelAnswer: `
const flatten = (arr) => {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val);
  }, []);
};`
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
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? \`\${prefix}.\${key}\` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        printKeys(obj[key], fullKey);
      } else {
        console.log(fullKey);
      }
    }
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
function getFrequency(arr) {
  const counts = {};
  arr.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });
  
  return Object.keys(counts).sort().reduce((acc, key) => {
    acc[key] = counts[key];
    return acc;
  }, {});
}`
  },
  {
    id: 'js-code-5',
    topic: 'String Parsing',
    type: QuestionType.Code,
    text: 'Find the max value from patterned string items in an array. Input: ["10-50-20", "80-90-35"]. Expected Output: [50, 90].',
    hint: 'Split each string by "-", convert to numbers, find max, and push to result.',
    modelAnswer: `
function findMaxValues(arr) {
  return arr.map(str => {
    const numbers = str.split('-').map(Number);
    return Math.max(...numbers);
  });
}`
  },
  {
    id: 'js-code-6',
    topic: 'Algorithms',
    type: QuestionType.Code,
    text: 'Find the missing values in an array of incremental natural numbers (e.g. 1..10). Input: [1, 2, 3, 5, 7, ...].',
    hint: 'Iterate from min to max expected values and check if they exist in the array.',
    modelAnswer: `
function findMissing(arr) {
  const missing = [];
  const min = arr[0];
  const max = arr[arr.length - 1];
  const set = new Set(arr);
  
  for (let i = min; i <= max; i++) {
    if (!set.has(i)) {
      missing.push(i);
    }
  }
  return missing;
}`
  },
  {
    id: 'js-code-7',
    topic: 'Array Logic',
    type: QuestionType.Code,
    text: 'Remove duplicates from array [10, 11, 9, 11...] and find odd numbers greater than 10. Return specific format.',
    hint: 'Use Set for uniqueness, then filter.',
    modelAnswer: `
const arr = [10, 11, 9, 11, 8, 5, 2, 9, 15, 5];
const unique = [...new Set(arr)].sort((a,b) => a - b);
const oddsGt10 = unique.filter(n => n % 2 !== 0 && n > 10);

console.log({ unique, oddsGt10 });`
  },
  {
    id: 'js-code-8',
    topic: 'Deep Clone',
    type: QuestionType.Code,
    text: 'Implement deep copy of an n-level nested object without external libraries.',
    hint: 'Recursive function that handles Arrays and Objects specifically.',
    modelAnswer: `
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
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
  
  for (let str of strs) {
    const key = str.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(str);
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
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <div>Time: {time}s</div>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => { setIsRunning(false); setTime(0); }}>Reset</button>
    </div>
  );
}`
  },
  {
    id: 'react-code-2',
    topic: 'React State',
    type: QuestionType.Code,
    text: 'Create a To-Do List with an input and Add button. New items appear below.',
    hint: 'State array for list, state string for input.',
    modelAnswer: `
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const add = () => {
    if(input) {
      setTodos([...todos, input]);
      setInput('');
    }
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>{todos.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
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
const ProgressBar = ({ value }) => (
  <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
    <div style={{
      width: \`\${value}%\`,
      backgroundColor: 'blue',
      height: '10px',
      borderRadius: '4px',
      transition: 'width 0.3s'
    }} />
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
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Usage in component:
// const { setTheme } = useContext(ThemeContext);
// <button onClick={() => setTheme('dark')}>Dark</button>
`
  },
  {
    id: 'react-code-5',
    topic: 'React Hooks',
    type: QuestionType.Code,
    text: 'Implement a custom hook `useDebounce` to delay a value update.',
    hint: 'useEffect with setTimeout that clears on dependency change.',
    modelAnswer: `
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: 'react-code-6',
    topic: 'Lifecycle',
    type: QuestionType.Code,
    text: 'Console log "Mounted" and "Unmounted" messages for Parent and 2 Children components to demonstrate lifecycle.',
    hint: 'useEffect with empty dependency array and return cleanup function.',
    modelAnswer: `
const Child = ({ name }) => {
  useEffect(() => {
    console.log(\`Mounted <\${name}>\`);
    return () => console.log(\`Un-mounted <\${name}>\`);
  }, []);
  return <div>{name}</div>;
};

const Parent = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    console.log('Mounted <Parent>');
    return () => console.log('Un-mounted <Parent>');
  }, []);

  if (!show) return null;
  return (
    <div>
      <Child name="child-1" />
      <Child name="child-2" />
      <button onClick={() => setShow(false)}>Unmount All</button>
    </div>
  );
};`
  },

  // --- MONGODB & BACKEND ---
  {
    id: 'mongo-query',
    topic: 'MongoDB Aggregation',
    type: QuestionType.Code,
    text: 'Write a MongoDB query to return a document but filter the "employees" array to only include "Full Stack Developer" roles.',
    hint: 'Use the aggregation pipeline with $project and $filter.',
    modelAnswer: `
db.collection.aggregate([
  {
    $project: {
      departmentId: 1,
      departmentName: 1,
      employees: {
        $filter: {
          input: "$employees",
          as: "employee",
          cond: { $eq: ["$$employee.role", "Full Stack Developer"] }
        }
      }
    }
  }
])`
  },
  {
    id: 'node-middleware',
    topic: 'Express JS',
    type: QuestionType.Code,
    text: 'Create a common error handling middleware for Express that catches errors from all routes.',
    hint: 'Define it after all routes. Function signature must have 4 arguments (err, req, res, next).',
    modelAnswer: `
// Define routes first
app.get('/route', (req, res, next) => {
  try {
    // code
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});`
  },

  // --- THEORETICAL QUESTIONS (Accumulated from previous) ---
  {
    id: 'css-swap',
    topic: 'CSS Logic',
    text: 'Assume we have 10 cards UI, how to swap 1st card with 5th card only with CSS properties?',
    hint: 'Flexbox order.',
    modelAnswer: 'Using Flexbox or Grid, you can use the `order` property. Default order is 0. Set the 1st card to `order: 5` and the 5th card to `order: 1`.'
  },
  {
    id: 'js-modules',
    topic: 'Module Systems',
    text: 'What are the differences between CJS, ESM, and MJS?',
    hint: 'require vs import.',
    modelAnswer: 'CJS uses `require()` (synchronous). ESM uses `import` (asynchronous). .mjs forces Node to treat file as ESM.'
  },
  {
    id: 'react-fiber',
    topic: 'React Internals',
    text: 'What is React Fiber and how does it relate to reconciliation?',
    hint: 'Incremental rendering.',
    modelAnswer: 'Fiber is the new reconciliation engine in React 16. It allows splitting rendering work into chunks and spreading it out over multiple frames, enabling features like Suspense and Concurrent Mode.'
  },
  {
    id: 'js-eventloop-macro',
    topic: 'Event Loop',
    text: 'Why are setTimeout considered Macrotasks and Promises Microtasks?',
    hint: 'Queue priority.',
    modelAnswer: 'Microtasks (Promises) are processed immediately after the current script and before rendering. Macrotasks (setTimeout) are processed in the next event loop tick.'
  }
];