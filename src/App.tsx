import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-max mx-auto m-6 bg-indigo-100 px-8 py-4">
      <h1>Hello world!</h1>
      <p>This is my website.</p>
      <div className="mt-6">
        <button
          className="w-full"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
